import { ToadScheduler, Task, CronJob } from "toad-scheduler";
import dbService from "../../../db/service/index.js";
import { quotes } from "../data/quotes.js";
// @ts-ignore
import { posted_quotes } from "../../../../../statics/posted-quotes.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { QuoteCategory } from "../../../types/types.js";
import { AttachmentBuilder, Colors, EmbedBuilder } from "discord.js";
import axios from "axios";
import { Logger } from "@roboplay/robo.js";
const logger = new Logger();
const scheduler = new ToadScheduler();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const attachmentsPath = path.join(__dirname, '../../../assets/');
const switchEmbedColors = (category)=>{
    switch(category){
        case QuoteCategory.Funny:
            return Colors.Gold;
        case QuoteCategory.Inspirational:
            return Colors.Green;
        case QuoteCategory.Programming:
            return Colors.DarkAqua;
    }
};
const switchEmbedAttachment = (category)=>{
    switch(category){
        case QuoteCategory.Funny:
            return 'daily-funny-image';
        case QuoteCategory.Inspirational:
            return 'daily-inspirational-image';
        case QuoteCategory.Programming:
            return 'daily-programming-image';
    }
};
const createQuotesEmbedMessage = async (category, quote)=>{
    const quoteEmbed = new EmbedBuilder();
    if (quote.author) {
        quoteEmbed.setAuthor({
            name: `${quote.author}`
        });
    }
    quoteEmbed.setImage(`attachment://${switchEmbedAttachment(category)}.png`).addFields({
        name: '\n',
        value: '```yaml\n' + quote.text + '\n```'
    }).setColor(switchEmbedColors(category));
    return quoteEmbed;
};
const getRandomFunnyQuote = async ()=>{
    try {
        const response = await axios.get("https://quotes.rest/qod?category=funny&language=en", {
            headers: {
                "Content-type": "application/json",
                "X-TheySaidSo-Api-Secret": `${process.env.THEY_SAID_SO_API_KEY}`,
                "Authorization": `Bearer ${process.env.THEY_SAID_SO_API_KEY}`
            }
        });
        const data = response.data.contents.quotes[0];
        return {
            author: data.author,
            text: data.quote
        };
    } catch (error) {
        logger.error(`getRandomFunnyQuote -> error`);
        logger.error(error);
    }
};
export const getInpirationalQuoteOfTheDay = async ()=>{
    try {
        const response = await axios.get("https://quotes.rest/qod?category=inspire&language=en", {
            headers: {
                "Content-type": "application/json",
                "X-TheySaidSo-Api-Secret": `${process.env.THEY_SAID_SO_API_KEY}`,
                "Authorization": `Bearer ${process.env.THEY_SAID_SO_API_KEY}`
            }
        });
        const data = response.data.contents.quotes[0];
        return {
            author: data.author,
            text: data.quote
        };
    } catch (error) {
        logger.error(`getInpirationalQuoteOfTheDay -> error`);
        logger.error(error);
    }
};
const getRandomProgrammingQuote = async ()=>{
    let availableQuotes = quotes.filter((quote)=>!posted_quotes.includes(quote.id));
    const postedQuotesFilePath = path.join(__dirname, '../../../../../statics/posted-quotes.js');
    // If there is no quotes left to post, reset posted quotes
    if (availableQuotes.length === 0) {
        console.log('No quotes left to post, resetting posted quotes');
        fs.writeFileSync(postedQuotesFilePath, `export const posted_quotes = ${JSON.stringify([], null, 2)};`);
        availableQuotes = quotes;
    }
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selectedQuote = availableQuotes[randomIndex];
    posted_quotes.push(selectedQuote.id);
    fs.writeFileSync(postedQuotesFilePath, `export const posted_quotes = ${JSON.stringify(posted_quotes, null, 2)};`);
    return {
        id: selectedQuote.id,
        author: selectedQuote.author,
        text: selectedQuote.en
    };
};
export const createOrStartQuotesJob = async (data, event, startEvent)=>{
    const switchQuotesJob = async (category)=>{
        switch(category){
            case QuoteCategory.Funny:
                return await getRandomFunnyQuote();
            case QuoteCategory.Inspirational:
                return await getInpirationalQuoteOfTheDay();
            case QuoteCategory.Programming:
                return await getRandomProgrammingQuote();
        }
    };
    try {
        const task = new Task(`${data.category}-task`, async ()=>{
            const d = data;
            let instance = (await dbService.getQuotesInstance(d.category)).data;
            if (!instance) {
                instance = (await dbService.createQuotesInstance(d)).data;
            }
            const filePath = path.join(attachmentsPath, `${switchEmbedAttachment(data.category)}.png`);
            const file = new AttachmentBuilder(filePath, {
                name: `${switchEmbedAttachment(data.category)}.png`
            });
            let channel;
            if (event) {
                channel = await event.member.guild.channels.cache.get(instance.channelId);
                console.log('Event provided');
            } else if (startEvent) {
                channel = await startEvent.channels.cache.get(data.channelId);
                console.log('Start event provided');
            }
            const quote = await switchQuotesJob(d.category);
            const embed = await createQuotesEmbedMessage(d.category, quote);
            await channel.send({
                embeds: [
                    embed
                ],
                files: [
                    file
                ]
            });
        });
        // const job = new SimpleIntervalJob(
        //   { seconds: 15, runImmediately: true },
        //   task,
        //   {id: data.category}
        // );
        // scheduler.addSimpleIntervalJob(job);
        const job = new CronJob({
            cronExpression: `0 ${data.cronHour} * * *`
        }, task, {
            id: data.category
        });
        scheduler.addCronJob(job);
        return true;
    } catch (error) {
        logger.error(`createOrStartQuotesJob -> error`);
        logger.error(error);
        return false;
    }
};
export const restartExistingCronInstances = async (startEvent)=>{
    const instances = await dbService.getAllQuotesInstances();
    if (instances.data && instances.data.length > 0) {
        instances.data.forEach(async (instance)=>{
            try {
                await createOrStartQuotesJob(instance, null, startEvent);
                const channel = await startEvent.channels.cache.get(`${process.env.DISCORD_DEBUG_CHANNEL_ID}`);
                if (channel) {
                    await channel.send(`Quotes instance for category ${instance.category} started`);
                }
            } catch (error) {
                logger.error(`restartExistingCronInstances -> error`);
                logger.error(error);
                const channel = await startEvent.channels.cache.get(`${process.env.DISCORD_DEBUG_CHANNEL_ID}`);
                if (channel) {
                    await channel.send(error);
                }
            }
        });
    }
};
export const stopAndDeleteQuotesJob = async (category)=>{
    try {
        let instance = await dbService.getQuotesInstance(category);
        if (instance.data) {
            await dbService.deleteQuotesInstance(category);
            scheduler.stopById(category);
            scheduler.removeById(category);
            logger.info(`Quotes instance for category ${category} stopped`);
        }
    } catch (error) {
        logger.error(`stopAndDeleteQuotesJob -> error`);
        logger.error(error);
    }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxxdW90ZXNcXHV0aWxzXFx1dGlscy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb2FkU2NoZWR1bGVyLCBUYXNrLCBDcm9uSm9iLCBTaW1wbGVJbnRlcnZhbEpvYiB9IGZyb20gJ3RvYWQtc2NoZWR1bGVyJztcclxuaW1wb3J0IGRiU2VydmljZSBmcm9tICcuLi8uLi8uLi9kYi9zZXJ2aWNlL2luZGV4LmpzJztcclxuaW1wb3J0IHsgUXVvdGVJbnN0YW5jZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3R5cGVzLmpzJztcclxuaW1wb3J0IHtxdW90ZXN9IGZyb20gJy4uL2RhdGEvcXVvdGVzLmpzJztcclxuLy8gQHRzLWlnbm9yZVxyXG5pbXBvcnQgeyBwb3N0ZWRfcXVvdGVzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc3RhdGljcy9wb3N0ZWQtcXVvdGVzLmpzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xyXG5pbXBvcnQgeyBRdW90ZUNhdGVnb3J5LCBRdW90ZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3R5cGVzLmpzJztcclxuaW1wb3J0IHsgQXR0YWNobWVudEJ1aWxkZXIsIENvbG9ycywgRW1iZWRCdWlsZGVyIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0Byb2JvcGxheS9yb2JvLmpzJztcclxuXHJcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcclxuXHJcbmNvbnN0IHNjaGVkdWxlciA9IG5ldyBUb2FkU2NoZWR1bGVyKCk7XHJcbmNvbnN0IF9fZmlsZW5hbWUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XHJcbmNvbnN0IF9fZGlybmFtZSA9IHBhdGguZGlybmFtZShfX2ZpbGVuYW1lKTtcclxuY29uc3QgYXR0YWNobWVudHNQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uLy4uL2Fzc2V0cy8nKTtcclxuXHJcbmNvbnN0IHN3aXRjaEVtYmVkQ29sb3JzID0gKGNhdGVnb3J5OiBRdW90ZUNhdGVnb3J5KSA9PiB7XHJcbiAgc3dpdGNoIChjYXRlZ29yeSkge1xyXG4gICAgY2FzZSBRdW90ZUNhdGVnb3J5LkZ1bm55OlxyXG4gICAgICByZXR1cm4gQ29sb3JzLkdvbGQ7XHJcbiAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuSW5zcGlyYXRpb25hbDpcclxuICAgICAgcmV0dXJuIENvbG9ycy5HcmVlbjtcclxuICAgIGNhc2UgUXVvdGVDYXRlZ29yeS5Qcm9ncmFtbWluZzpcclxuICAgICAgcmV0dXJuIENvbG9ycy5EYXJrQXF1YTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHN3aXRjaEVtYmVkQXR0YWNobWVudCA9IChjYXRlZ29yeTogUXVvdGVDYXRlZ29yeSkgPT4ge1xyXG4gIHN3aXRjaCAoY2F0ZWdvcnkpIHtcclxuICAgIGNhc2UgUXVvdGVDYXRlZ29yeS5GdW5ueTpcclxuICAgICAgcmV0dXJuICdkYWlseS1mdW5ueS1pbWFnZSc7XHJcbiAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuSW5zcGlyYXRpb25hbDpcclxuICAgICAgcmV0dXJuICdkYWlseS1pbnNwaXJhdGlvbmFsLWltYWdlJztcclxuICAgIGNhc2UgUXVvdGVDYXRlZ29yeS5Qcm9ncmFtbWluZzpcclxuICAgICAgcmV0dXJuICdkYWlseS1wcm9ncmFtbWluZy1pbWFnZSc7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBjcmVhdGVRdW90ZXNFbWJlZE1lc3NhZ2UgPSBhc3luYyAoY2F0ZWdvcnk6IFF1b3RlQ2F0ZWdvcnksIHF1b3RlOiBRdW90ZSkgPT4ge1xyXG4gIGNvbnN0IHF1b3RlRW1iZWQgPSBuZXcgRW1iZWRCdWlsZGVyKCk7XHJcblxyXG5cdGlmIChxdW90ZS5hdXRob3IpIHtcclxuICAgIHF1b3RlRW1iZWQuc2V0QXV0aG9yKHsgbmFtZTogYCR7cXVvdGUuYXV0aG9yfWB9KTtcclxuICB9XHJcblx0cXVvdGVFbWJlZFxyXG4gIC5zZXRJbWFnZShgYXR0YWNobWVudDovLyR7c3dpdGNoRW1iZWRBdHRhY2htZW50KGNhdGVnb3J5KX0ucG5nYClcclxuXHQuYWRkRmllbGRzKFxyXG5cdFx0eyBuYW1lOiAnXFxuJywgdmFsdWU6ICdgYGB5YW1sXFxuJyArIHF1b3RlLnRleHQgKyAnXFxuYGBgJ31cclxuXHQpXHJcbiAgLnNldENvbG9yKHN3aXRjaEVtYmVkQ29sb3JzKGNhdGVnb3J5KSk7XHJcblxyXG4gIHJldHVybiBxdW90ZUVtYmVkO1xyXG59XHJcblxyXG5jb25zdCBnZXRSYW5kb21GdW5ueVF1b3RlID0gYXN5bmMgKCk6IFByb21pc2U8UXVvdGU+ID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoXCJodHRwczovL3F1b3Rlcy5yZXN0L3FvZD9jYXRlZ29yeT1mdW5ueSZsYW5ndWFnZT1lblwiLCB7XHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICBcIlgtVGhleVNhaWRTby1BcGktU2VjcmV0XCI6IGAke3Byb2Nlc3MuZW52LlRIRVlfU0FJRF9TT19BUElfS0VZfWAsXHJcbiAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHtwcm9jZXNzLmVudi5USEVZX1NBSURfU09fQVBJX0tFWX1gLFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5kYXRhLmNvbnRlbnRzLnF1b3Rlc1swXTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGF1dGhvcjogZGF0YS5hdXRob3IsXHJcbiAgICAgIHRleHQ6IGRhdGEucXVvdGVcclxuICAgIH07XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGxvZ2dlci5lcnJvcihgZ2V0UmFuZG9tRnVubnlRdW90ZSAtPiBlcnJvcmApO1xyXG4gICAgbG9nZ2VyLmVycm9yKGVycm9yKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldElucGlyYXRpb25hbFF1b3RlT2ZUaGVEYXkgPSBhc3luYyAoKTogUHJvbWlzZTxRdW90ZT4gPT4geyBcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoXCJodHRwczovL3F1b3Rlcy5yZXN0L3FvZD9jYXRlZ29yeT1pbnNwaXJlJmxhbmd1YWdlPWVuXCIsIHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIFwiWC1UaGV5U2FpZFNvLUFwaS1TZWNyZXRcIjogYCR7cHJvY2Vzcy5lbnYuVEhFWV9TQUlEX1NPX0FQSV9LRVl9YCxcclxuICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogYEJlYXJlciAke3Byb2Nlc3MuZW52LlRIRVlfU0FJRF9TT19BUElfS0VZfWAsXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmRhdGEuY29udGVudHMucXVvdGVzWzBdO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXV0aG9yOiBkYXRhLmF1dGhvcixcclxuICAgICAgdGV4dDogZGF0YS5xdW90ZVxyXG4gICAgfTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgbG9nZ2VyLmVycm9yKGBnZXRJbnBpcmF0aW9uYWxRdW90ZU9mVGhlRGF5IC0+IGVycm9yYCk7XHJcbiAgICBsb2dnZXIuZXJyb3IoZXJyb3IpXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBnZXRSYW5kb21Qcm9ncmFtbWluZ1F1b3RlID0gYXN5bmMgKCk6IFByb21pc2U8UXVvdGU+ID0+IHtcclxuICBsZXQgYXZhaWxhYmxlUXVvdGVzID0gcXVvdGVzLmZpbHRlcihxdW90ZSA9PiAhcG9zdGVkX3F1b3Rlcy5pbmNsdWRlcyhxdW90ZS5pZCkpO1xyXG4gIGNvbnN0IHBvc3RlZFF1b3Rlc0ZpbGVQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uLy4uLy4uLy4uL3N0YXRpY3MvcG9zdGVkLXF1b3Rlcy5qcycpO1xyXG4gIC8vIElmIHRoZXJlIGlzIG5vIHF1b3RlcyBsZWZ0IHRvIHBvc3QsIHJlc2V0IHBvc3RlZCBxdW90ZXNcclxuICBpZiAoYXZhaWxhYmxlUXVvdGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgY29uc29sZS5sb2coJ05vIHF1b3RlcyBsZWZ0IHRvIHBvc3QsIHJlc2V0dGluZyBwb3N0ZWQgcXVvdGVzJylcclxuICAgIGZzLndyaXRlRmlsZVN5bmMocG9zdGVkUXVvdGVzRmlsZVBhdGgsIGBleHBvcnQgY29uc3QgcG9zdGVkX3F1b3RlcyA9ICR7SlNPTi5zdHJpbmdpZnkoW10sIG51bGwsIDIpfTtgKTtcclxuICAgIGF2YWlsYWJsZVF1b3RlcyA9IHF1b3RlcztcclxuICB9XHJcblxyXG4gIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlUXVvdGVzLmxlbmd0aCk7XHJcbiAgY29uc3Qgc2VsZWN0ZWRRdW90ZSA9IGF2YWlsYWJsZVF1b3Rlc1tyYW5kb21JbmRleF07XHJcblxyXG4gIHBvc3RlZF9xdW90ZXMucHVzaChzZWxlY3RlZFF1b3RlLmlkKTtcclxuICBmcy53cml0ZUZpbGVTeW5jKHBvc3RlZFF1b3Rlc0ZpbGVQYXRoLCBgZXhwb3J0IGNvbnN0IHBvc3RlZF9xdW90ZXMgPSAke0pTT04uc3RyaW5naWZ5KHBvc3RlZF9xdW90ZXMsIG51bGwsIDIpfTtgKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGlkOiBzZWxlY3RlZFF1b3RlLmlkLFxyXG4gICAgYXV0aG9yOiBzZWxlY3RlZFF1b3RlLmF1dGhvcixcclxuICAgIHRleHQ6IHNlbGVjdGVkUXVvdGUuZW5cclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlT3JTdGFydFF1b3Rlc0pvYiA9IGFzeW5jIChkYXRhOiBRdW90ZUluc3RhbmNlLCBldmVudDogYW55LCBzdGFydEV2ZW50PzogYW55KSA9PiB7XHJcbiAgY29uc3Qgc3dpdGNoUXVvdGVzSm9iID0gYXN5bmMgKGNhdGVnb3J5OiBRdW90ZUNhdGVnb3J5KSA9PiB7XHJcbiAgICBzd2l0Y2ggKGNhdGVnb3J5KSB7XHJcbiAgICAgIGNhc2UgUXVvdGVDYXRlZ29yeS5GdW5ueTpcclxuICAgICAgICByZXR1cm4gYXdhaXQgZ2V0UmFuZG9tRnVubnlRdW90ZSgpO1xyXG4gICAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuSW5zcGlyYXRpb25hbDpcclxuICAgICAgICByZXR1cm4gYXdhaXQgZ2V0SW5waXJhdGlvbmFsUXVvdGVPZlRoZURheSgpO1xyXG4gICAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuUHJvZ3JhbW1pbmc6XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGdldFJhbmRvbVByb2dyYW1taW5nUXVvdGUoKTtcclxuICAgIH1cclxuICB9XHJcbiAgICBcclxuICB0cnkge1xyXG4gICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKFxyXG4gICAgICBgJHtkYXRhLmNhdGVnb3J5fS10YXNrYCwgYXN5bmMgKCkgPT4geyBcclxuICAgICAgICBjb25zdCBkID0gZGF0YTtcclxuICAgICAgICBsZXQgaW5zdGFuY2UgPSAoYXdhaXQgZGJTZXJ2aWNlLmdldFF1b3Rlc0luc3RhbmNlKGQuY2F0ZWdvcnkpKS5kYXRhO1xyXG4gICAgICAgIGlmICghaW5zdGFuY2UpIHtcclxuICAgICAgICAgaW5zdGFuY2UgPSAoYXdhaXQgZGJTZXJ2aWNlLmNyZWF0ZVF1b3Rlc0luc3RhbmNlKGQpKS5kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXR0YWNobWVudHNQYXRoLCBgJHtzd2l0Y2hFbWJlZEF0dGFjaG1lbnQoZGF0YS5jYXRlZ29yeSl9LnBuZ2ApO1xyXG4gICAgICAgIGNvbnN0IGZpbGUgPSBuZXcgQXR0YWNobWVudEJ1aWxkZXIoZmlsZVBhdGgsIHtcclxuICAgICAgICAgIG5hbWU6IGAke3N3aXRjaEVtYmVkQXR0YWNobWVudChkYXRhLmNhdGVnb3J5KX0ucG5nYFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBjaGFubmVsO1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgY2hhbm5lbCA9IGF3YWl0IGV2ZW50Lm1lbWJlci5ndWlsZC5jaGFubmVscy5jYWNoZS5nZXQoaW5zdGFuY2UuY2hhbm5lbElkKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdFdmVudCBwcm92aWRlZCcpXHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGFydEV2ZW50KSB7XHJcbiAgICAgICAgICBjaGFubmVsID0gYXdhaXQgc3RhcnRFdmVudC5jaGFubmVscy5jYWNoZS5nZXQoZGF0YS5jaGFubmVsSWQpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1N0YXJ0IGV2ZW50IHByb3ZpZGVkJylcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcXVvdGUgPSBhd2FpdCBzd2l0Y2hRdW90ZXNKb2IoZC5jYXRlZ29yeSk7XHJcbiAgICAgICAgY29uc3QgZW1iZWQgPSBhd2FpdCBjcmVhdGVRdW90ZXNFbWJlZE1lc3NhZ2UoZC5jYXRlZ29yeSwgcXVvdGUpO1xyXG4gICAgICAgIGF3YWl0IGNoYW5uZWwuc2VuZCh7IGVtYmVkczogW2VtYmVkXSwgZmlsZXM6IFtmaWxlXSB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBjb25zdCBqb2IgPSBuZXcgU2ltcGxlSW50ZXJ2YWxKb2IoXHJcbiAgICAgIC8vICAgeyBzZWNvbmRzOiAxNSwgcnVuSW1tZWRpYXRlbHk6IHRydWUgfSxcclxuICAgICAgLy8gICB0YXNrLFxyXG4gICAgICAvLyAgIHtpZDogZGF0YS5jYXRlZ29yeX1cclxuICAgICAgLy8gKTtcclxuICAgICAgLy8gc2NoZWR1bGVyLmFkZFNpbXBsZUludGVydmFsSm9iKGpvYik7XHJcbiAgICAgIGNvbnN0IGpvYiA9IG5ldyBDcm9uSm9iKHtcclxuICAgICAgICBjcm9uRXhwcmVzc2lvbjogYDAgJHtkYXRhLmNyb25Ib3VyfSAqICogKmAsXHJcbiAgICAgIH0sIHRhc2ssIHtpZDogZGF0YS5jYXRlZ29yeX0pO1xyXG4gICAgICBzY2hlZHVsZXIuYWRkQ3JvbkpvYihqb2IpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGxvZ2dlci5lcnJvcihgY3JlYXRlT3JTdGFydFF1b3Rlc0pvYiAtPiBlcnJvcmApO1xyXG4gICAgbG9nZ2VyLmVycm9yKGVycm9yKVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc3RhcnRFeGlzdGluZ0Nyb25JbnN0YW5jZXMgPSBhc3luYyAoc3RhcnRFdmVudCkgPT4geyBcclxuICBjb25zdCBpbnN0YW5jZXMgPSBhd2FpdCBkYlNlcnZpY2UuZ2V0QWxsUXVvdGVzSW5zdGFuY2VzKCk7XHJcbiAgaWYgKGluc3RhbmNlcy5kYXRhICYmIGluc3RhbmNlcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgIGluc3RhbmNlcy5kYXRhLmZvckVhY2goYXN5bmMgKGluc3RhbmNlOiBRdW90ZUluc3RhbmNlKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgY3JlYXRlT3JTdGFydFF1b3Rlc0pvYihpbnN0YW5jZSwgbnVsbCwgc3RhcnRFdmVudCk7XHJcbiAgICAgICAgY29uc3QgY2hhbm5lbCA9IGF3YWl0IHN0YXJ0RXZlbnQuY2hhbm5lbHMuY2FjaGUuZ2V0KGAke3Byb2Nlc3MuZW52LkRJU0NPUkRfREVCVUdfQ0hBTk5FTF9JRH1gKTtcclxuICAgICAgICBpZiAoY2hhbm5lbCkge1xyXG4gICAgICAgICAgYXdhaXQgY2hhbm5lbC5zZW5kKGBRdW90ZXMgaW5zdGFuY2UgZm9yIGNhdGVnb3J5ICR7aW5zdGFuY2UuY2F0ZWdvcnl9IHN0YXJ0ZWRgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKGByZXN0YXJ0RXhpc3RpbmdDcm9uSW5zdGFuY2VzIC0+IGVycm9yYCk7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKGVycm9yKVxyXG4gICAgICAgIGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBzdGFydEV2ZW50LmNoYW5uZWxzLmNhY2hlLmdldChgJHtwcm9jZXNzLmVudi5ESVNDT1JEX0RFQlVHX0NIQU5ORUxfSUR9YCk7XHJcbiAgICAgICAgaWYgKGNoYW5uZWwpIHtcclxuICAgICAgICAgIGF3YWl0IGNoYW5uZWwuc2VuZChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHN0b3BBbmREZWxldGVRdW90ZXNKb2IgPSBhc3luYyAoY2F0ZWdvcnk6IHN0cmluZykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBsZXQgaW5zdGFuY2UgPSBhd2FpdCBkYlNlcnZpY2UuZ2V0UXVvdGVzSW5zdGFuY2UoY2F0ZWdvcnkpO1xyXG4gICAgaWYgKGluc3RhbmNlLmRhdGEpIHtcclxuICAgICBhd2FpdCBkYlNlcnZpY2UuZGVsZXRlUXVvdGVzSW5zdGFuY2UoY2F0ZWdvcnkpO1xyXG4gICAgIHNjaGVkdWxlci5zdG9wQnlJZChjYXRlZ29yeSk7XHJcbiAgICAgc2NoZWR1bGVyLnJlbW92ZUJ5SWQoY2F0ZWdvcnkpO1xyXG4gICAgIGxvZ2dlci5pbmZvKGBRdW90ZXMgaW5zdGFuY2UgZm9yIGNhdGVnb3J5ICR7Y2F0ZWdvcnl9IHN0b3BwZWRgKTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgbG9nZ2VyLmVycm9yKGBzdG9wQW5kRGVsZXRlUXVvdGVzSm9iIC0+IGVycm9yYCk7XHJcbiAgICBsb2dnZXIuZXJyb3IoZXJyb3IpXHJcbiAgfVxyXG59Il0sIm5hbWVzIjpbIlRvYWRTY2hlZHVsZXIiLCJUYXNrIiwiQ3JvbkpvYiIsImRiU2VydmljZSIsInF1b3RlcyIsInBvc3RlZF9xdW90ZXMiLCJwYXRoIiwiZnMiLCJmaWxlVVJMVG9QYXRoIiwiUXVvdGVDYXRlZ29yeSIsIkF0dGFjaG1lbnRCdWlsZGVyIiwiQ29sb3JzIiwiRW1iZWRCdWlsZGVyIiwiYXhpb3MiLCJMb2dnZXIiLCJsb2dnZXIiLCJzY2hlZHVsZXIiLCJfX2ZpbGVuYW1lIiwidXJsIiwiX19kaXJuYW1lIiwiZGlybmFtZSIsImF0dGFjaG1lbnRzUGF0aCIsImpvaW4iLCJzd2l0Y2hFbWJlZENvbG9ycyIsImNhdGVnb3J5IiwiRnVubnkiLCJHb2xkIiwiSW5zcGlyYXRpb25hbCIsIkdyZWVuIiwiUHJvZ3JhbW1pbmciLCJEYXJrQXF1YSIsInN3aXRjaEVtYmVkQXR0YWNobWVudCIsImNyZWF0ZVF1b3Rlc0VtYmVkTWVzc2FnZSIsInF1b3RlIiwicXVvdGVFbWJlZCIsImF1dGhvciIsInNldEF1dGhvciIsIm5hbWUiLCJzZXRJbWFnZSIsImFkZEZpZWxkcyIsInZhbHVlIiwidGV4dCIsInNldENvbG9yIiwiZ2V0UmFuZG9tRnVubnlRdW90ZSIsInJlc3BvbnNlIiwiZ2V0IiwiaGVhZGVycyIsInByb2Nlc3MiLCJlbnYiLCJUSEVZX1NBSURfU09fQVBJX0tFWSIsImRhdGEiLCJjb250ZW50cyIsImVycm9yIiwiZ2V0SW5waXJhdGlvbmFsUXVvdGVPZlRoZURheSIsImdldFJhbmRvbVByb2dyYW1taW5nUXVvdGUiLCJhdmFpbGFibGVRdW90ZXMiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImlkIiwicG9zdGVkUXVvdGVzRmlsZVBhdGgiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwid3JpdGVGaWxlU3luYyIsIkpTT04iLCJzdHJpbmdpZnkiLCJyYW5kb21JbmRleCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInNlbGVjdGVkUXVvdGUiLCJwdXNoIiwiZW4iLCJjcmVhdGVPclN0YXJ0UXVvdGVzSm9iIiwiZXZlbnQiLCJzdGFydEV2ZW50Iiwic3dpdGNoUXVvdGVzSm9iIiwidGFzayIsImQiLCJpbnN0YW5jZSIsImdldFF1b3Rlc0luc3RhbmNlIiwiY3JlYXRlUXVvdGVzSW5zdGFuY2UiLCJmaWxlUGF0aCIsImZpbGUiLCJjaGFubmVsIiwibWVtYmVyIiwiZ3VpbGQiLCJjaGFubmVscyIsImNhY2hlIiwiY2hhbm5lbElkIiwiZW1iZWQiLCJzZW5kIiwiZW1iZWRzIiwiZmlsZXMiLCJqb2IiLCJjcm9uRXhwcmVzc2lvbiIsImNyb25Ib3VyIiwiYWRkQ3JvbkpvYiIsInJlc3RhcnRFeGlzdGluZ0Nyb25JbnN0YW5jZXMiLCJpbnN0YW5jZXMiLCJnZXRBbGxRdW90ZXNJbnN0YW5jZXMiLCJmb3JFYWNoIiwiRElTQ09SRF9ERUJVR19DSEFOTkVMX0lEIiwic3RvcEFuZERlbGV0ZVF1b3Rlc0pvYiIsImRlbGV0ZVF1b3Rlc0luc3RhbmNlIiwic3RvcEJ5SWQiLCJyZW1vdmVCeUlkIiwiaW5mbyJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsYUFBYSxFQUFFQyxJQUFJLEVBQUVDLE9BQU8sUUFBMkIsaUJBQWlCO0FBQ2pGLE9BQU9DLGVBQWUsK0JBQStCO0FBRXJELFNBQVFDLE1BQU0sUUFBTyxvQkFBb0I7QUFDekMsYUFBYTtBQUNiLFNBQVNDLGFBQWEsUUFBUSwwQ0FBMEM7QUFDeEUsT0FBT0MsVUFBVSxPQUFPO0FBQ3hCLE9BQU9DLFFBQVEsS0FBSztBQUNwQixTQUFTQyxhQUFhLFFBQVEsTUFBTTtBQUNwQyxTQUFTQyxhQUFhLFFBQWUsMEJBQTBCO0FBQy9ELFNBQVNDLGlCQUFpQixFQUFFQyxNQUFNLEVBQUVDLFlBQVksUUFBUSxhQUFhO0FBQ3JFLE9BQU9DLFdBQVcsUUFBUTtBQUMxQixTQUFTQyxNQUFNLFFBQVEsb0JBQW9CO0FBRTNDLE1BQU1DLFNBQVMsSUFBSUQ7QUFFbkIsTUFB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