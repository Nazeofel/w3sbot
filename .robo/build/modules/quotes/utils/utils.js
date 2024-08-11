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
import { Logger } from "robo.js";
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcbW9kdWxlc1xccXVvdGVzXFx1dGlsc1xcdXRpbHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9hZFNjaGVkdWxlciwgVGFzaywgQ3JvbkpvYiwgU2ltcGxlSW50ZXJ2YWxKb2IgfSBmcm9tICd0b2FkLXNjaGVkdWxlcic7XHJcbmltcG9ydCBkYlNlcnZpY2UgZnJvbSAnLi4vLi4vLi4vZGIvc2VydmljZS9pbmRleC5qcyc7XHJcbmltcG9ydCB7IFF1b3RlSW5zdGFuY2UgfSBmcm9tICcuLi8uLi8uLi90eXBlcy90eXBlcy5qcyc7XHJcbmltcG9ydCB7cXVvdGVzfSBmcm9tICcuLi9kYXRhL3F1b3Rlcy5qcyc7XHJcbi8vIEB0cy1pZ25vcmVcclxuaW1wb3J0IHsgcG9zdGVkX3F1b3RlcyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3N0YXRpY3MvcG9zdGVkLXF1b3Rlcy5qcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJztcclxuaW1wb3J0IHsgUXVvdGVDYXRlZ29yeSwgUXVvdGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcy90eXBlcy5qcyc7XHJcbmltcG9ydCB7IEF0dGFjaG1lbnRCdWlsZGVyLCBDb2xvcnMsIEVtYmVkQnVpbGRlciB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdyb2JvLmpzJztcclxuXHJcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcclxuXHJcbmNvbnN0IHNjaGVkdWxlciA9IG5ldyBUb2FkU2NoZWR1bGVyKCk7XHJcbmNvbnN0IF9fZmlsZW5hbWUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XHJcbmNvbnN0IF9fZGlybmFtZSA9IHBhdGguZGlybmFtZShfX2ZpbGVuYW1lKTtcclxuY29uc3QgYXR0YWNobWVudHNQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uLy4uL2Fzc2V0cy8nKTtcclxuXHJcbmNvbnN0IHN3aXRjaEVtYmVkQ29sb3JzID0gKGNhdGVnb3J5OiBRdW90ZUNhdGVnb3J5KSA9PiB7XHJcbiAgc3dpdGNoIChjYXRlZ29yeSkge1xyXG4gICAgY2FzZSBRdW90ZUNhdGVnb3J5LkZ1bm55OlxyXG4gICAgICByZXR1cm4gQ29sb3JzLkdvbGQ7XHJcbiAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuSW5zcGlyYXRpb25hbDpcclxuICAgICAgcmV0dXJuIENvbG9ycy5HcmVlbjtcclxuICAgIGNhc2UgUXVvdGVDYXRlZ29yeS5Qcm9ncmFtbWluZzpcclxuICAgICAgcmV0dXJuIENvbG9ycy5EYXJrQXF1YTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHN3aXRjaEVtYmVkQXR0YWNobWVudCA9IChjYXRlZ29yeTogUXVvdGVDYXRlZ29yeSkgPT4ge1xyXG4gIHN3aXRjaCAoY2F0ZWdvcnkpIHtcclxuICAgIGNhc2UgUXVvdGVDYXRlZ29yeS5GdW5ueTpcclxuICAgICAgcmV0dXJuICdkYWlseS1mdW5ueS1pbWFnZSc7XHJcbiAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuSW5zcGlyYXRpb25hbDpcclxuICAgICAgcmV0dXJuICdkYWlseS1pbnNwaXJhdGlvbmFsLWltYWdlJztcclxuICAgIGNhc2UgUXVvdGVDYXRlZ29yeS5Qcm9ncmFtbWluZzpcclxuICAgICAgcmV0dXJuICdkYWlseS1wcm9ncmFtbWluZy1pbWFnZSc7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBjcmVhdGVRdW90ZXNFbWJlZE1lc3NhZ2UgPSBhc3luYyAoY2F0ZWdvcnk6IFF1b3RlQ2F0ZWdvcnksIHF1b3RlOiBRdW90ZSkgPT4ge1xyXG4gIGNvbnN0IHF1b3RlRW1iZWQgPSBuZXcgRW1iZWRCdWlsZGVyKCk7XHJcblxyXG5cdGlmIChxdW90ZS5hdXRob3IpIHtcclxuICAgIHF1b3RlRW1iZWQuc2V0QXV0aG9yKHsgbmFtZTogYCR7cXVvdGUuYXV0aG9yfWB9KTtcclxuICB9XHJcblx0cXVvdGVFbWJlZFxyXG4gIC5zZXRJbWFnZShgYXR0YWNobWVudDovLyR7c3dpdGNoRW1iZWRBdHRhY2htZW50KGNhdGVnb3J5KX0ucG5nYClcclxuXHQuYWRkRmllbGRzKFxyXG5cdFx0eyBuYW1lOiAnXFxuJywgdmFsdWU6ICdgYGB5YW1sXFxuJyArIHF1b3RlLnRleHQgKyAnXFxuYGBgJ31cclxuXHQpXHJcbiAgLnNldENvbG9yKHN3aXRjaEVtYmVkQ29sb3JzKGNhdGVnb3J5KSk7XHJcblxyXG4gIHJldHVybiBxdW90ZUVtYmVkO1xyXG59XHJcblxyXG5jb25zdCBnZXRSYW5kb21GdW5ueVF1b3RlID0gYXN5bmMgKCk6IFByb21pc2U8UXVvdGU+ID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoXCJodHRwczovL3F1b3Rlcy5yZXN0L3FvZD9jYXRlZ29yeT1mdW5ueSZsYW5ndWFnZT1lblwiLCB7XHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICBcIlgtVGhleVNhaWRTby1BcGktU2VjcmV0XCI6IGAke3Byb2Nlc3MuZW52LlRIRVlfU0FJRF9TT19BUElfS0VZfWAsXHJcbiAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHtwcm9jZXNzLmVudi5USEVZX1NBSURfU09fQVBJX0tFWX1gLFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5kYXRhLmNvbnRlbnRzLnF1b3Rlc1swXTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGF1dGhvcjogZGF0YS5hdXRob3IsXHJcbiAgICAgIHRleHQ6IGRhdGEucXVvdGVcclxuICAgIH07XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGxvZ2dlci5lcnJvcihgZ2V0UmFuZG9tRnVubnlRdW90ZSAtPiBlcnJvcmApO1xyXG4gICAgbG9nZ2VyLmVycm9yKGVycm9yKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldElucGlyYXRpb25hbFF1b3RlT2ZUaGVEYXkgPSBhc3luYyAoKTogUHJvbWlzZTxRdW90ZT4gPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChcImh0dHBzOi8vcXVvdGVzLnJlc3QvcW9kP2NhdGVnb3J5PWluc3BpcmUmbGFuZ3VhZ2U9ZW5cIiwge1xyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgXCJYLVRoZXlTYWlkU28tQXBpLVNlY3JldFwiOiBgJHtwcm9jZXNzLmVudi5USEVZX1NBSURfU09fQVBJX0tFWX1gLFxyXG4gICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7cHJvY2Vzcy5lbnYuVEhFWV9TQUlEX1NPX0FQSV9LRVl9YCxcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YS5jb250ZW50cy5xdW90ZXNbMF07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhdXRob3I6IGRhdGEuYXV0aG9yLFxyXG4gICAgICB0ZXh0OiBkYXRhLnF1b3RlXHJcbiAgICB9O1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBsb2dnZXIuZXJyb3IoYGdldElucGlyYXRpb25hbFF1b3RlT2ZUaGVEYXkgLT4gZXJyb3JgKTtcclxuICAgIGxvZ2dlci5lcnJvcihlcnJvcilcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGdldFJhbmRvbVByb2dyYW1taW5nUXVvdGUgPSBhc3luYyAoKTogUHJvbWlzZTxRdW90ZT4gPT4ge1xyXG4gIGxldCBhdmFpbGFibGVRdW90ZXMgPSBxdW90ZXMuZmlsdGVyKHF1b3RlID0+ICFwb3N0ZWRfcXVvdGVzLmluY2x1ZGVzKHF1b3RlLmlkKSk7XHJcbiAgY29uc3QgcG9zdGVkUXVvdGVzRmlsZVBhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vLi4vLi4vLi4vLi4vc3RhdGljcy9wb3N0ZWQtcXVvdGVzLmpzJyk7XHJcbiAgLy8gSWYgdGhlcmUgaXMgbm8gcXVvdGVzIGxlZnQgdG8gcG9zdCwgcmVzZXQgcG9zdGVkIHF1b3Rlc1xyXG4gIGlmIChhdmFpbGFibGVRdW90ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICBjb25zb2xlLmxvZygnTm8gcXVvdGVzIGxlZnQgdG8gcG9zdCwgcmVzZXR0aW5nIHBvc3RlZCBxdW90ZXMnKVxyXG4gICAgZnMud3JpdGVGaWxlU3luYyhwb3N0ZWRRdW90ZXNGaWxlUGF0aCwgYGV4cG9ydCBjb25zdCBwb3N0ZWRfcXVvdGVzID0gJHtKU09OLnN0cmluZ2lmeShbXSwgbnVsbCwgMil9O2ApO1xyXG4gICAgYXZhaWxhYmxlUXVvdGVzID0gcXVvdGVzO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhdmFpbGFibGVRdW90ZXMubGVuZ3RoKTtcclxuICBjb25zdCBzZWxlY3RlZFF1b3RlID0gYXZhaWxhYmxlUXVvdGVzW3JhbmRvbUluZGV4XTtcclxuXHJcbiAgcG9zdGVkX3F1b3Rlcy5wdXNoKHNlbGVjdGVkUXVvdGUuaWQpO1xyXG4gIGZzLndyaXRlRmlsZVN5bmMocG9zdGVkUXVvdGVzRmlsZVBhdGgsIGBleHBvcnQgY29uc3QgcG9zdGVkX3F1b3RlcyA9ICR7SlNPTi5zdHJpbmdpZnkocG9zdGVkX3F1b3RlcywgbnVsbCwgMil9O2ApO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaWQ6IHNlbGVjdGVkUXVvdGUuaWQsXHJcbiAgICBhdXRob3I6IHNlbGVjdGVkUXVvdGUuYXV0aG9yLFxyXG4gICAgdGV4dDogc2VsZWN0ZWRRdW90ZS5lblxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVPclN0YXJ0UXVvdGVzSm9iID0gYXN5bmMgKGRhdGE6IFF1b3RlSW5zdGFuY2UsIGV2ZW50OiBhbnksIHN0YXJ0RXZlbnQ/OiBhbnkpID0+IHtcclxuICBjb25zdCBzd2l0Y2hRdW90ZXNKb2IgPSBhc3luYyAoY2F0ZWdvcnk6IFF1b3RlQ2F0ZWdvcnkpID0+IHtcclxuICAgIHN3aXRjaCAoY2F0ZWdvcnkpIHtcclxuICAgICAgY2FzZSBRdW90ZUNhdGVnb3J5LkZ1bm55OlxyXG4gICAgICAgIHJldHVybiBhd2FpdCBnZXRSYW5kb21GdW5ueVF1b3RlKCk7XHJcbiAgICAgIGNhc2UgUXVvdGVDYXRlZ29yeS5JbnNwaXJhdGlvbmFsOlxyXG4gICAgICAgIHJldHVybiBhd2FpdCBnZXRJbnBpcmF0aW9uYWxRdW90ZU9mVGhlRGF5KCk7XHJcbiAgICAgIGNhc2UgUXVvdGVDYXRlZ29yeS5Qcm9ncmFtbWluZzpcclxuICAgICAgICByZXR1cm4gYXdhaXQgZ2V0UmFuZG9tUHJvZ3JhbW1pbmdRdW90ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayhcclxuICAgICAgYCR7ZGF0YS5jYXRlZ29yeX0tdGFza2AsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBkID0gZGF0YTtcclxuICAgICAgICBsZXQgaW5zdGFuY2UgPSAoYXdhaXQgZGJTZXJ2aWNlLmdldFF1b3Rlc0luc3RhbmNlKGQuY2F0ZWdvcnkpKS5kYXRhO1xyXG4gICAgICAgIGlmICghaW5zdGFuY2UpIHtcclxuICAgICAgICAgaW5zdGFuY2UgPSAoYXdhaXQgZGJTZXJ2aWNlLmNyZWF0ZVF1b3Rlc0luc3RhbmNlKGQpKS5kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXR0YWNobWVudHNQYXRoLCBgJHtzd2l0Y2hFbWJlZEF0dGFjaG1lbnQoZGF0YS5jYXRlZ29yeSl9LnBuZ2ApO1xyXG4gICAgICAgIGNvbnN0IGZpbGUgPSBuZXcgQXR0YWNobWVudEJ1aWxkZXIoZmlsZVBhdGgsIHtcclxuICAgICAgICAgIG5hbWU6IGAke3N3aXRjaEVtYmVkQXR0YWNobWVudChkYXRhLmNhdGVnb3J5KX0ucG5nYFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBjaGFubmVsO1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgY2hhbm5lbCA9IGF3YWl0IGV2ZW50Lm1lbWJlci5ndWlsZC5jaGFubmVscy5jYWNoZS5nZXQoaW5zdGFuY2UuY2hhbm5lbElkKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdFdmVudCBwcm92aWRlZCcpXHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGFydEV2ZW50KSB7XHJcbiAgICAgICAgICBjaGFubmVsID0gYXdhaXQgc3RhcnRFdmVudC5jaGFubmVscy5jYWNoZS5nZXQoZGF0YS5jaGFubmVsSWQpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1N0YXJ0IGV2ZW50IHByb3ZpZGVkJylcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcXVvdGUgPSBhd2FpdCBzd2l0Y2hRdW90ZXNKb2IoZC5jYXRlZ29yeSk7XHJcbiAgICAgICAgY29uc3QgZW1iZWQgPSBhd2FpdCBjcmVhdGVRdW90ZXNFbWJlZE1lc3NhZ2UoZC5jYXRlZ29yeSwgcXVvdGUpO1xyXG4gICAgICAgIGF3YWl0IGNoYW5uZWwuc2VuZCh7IGVtYmVkczogW2VtYmVkXSwgZmlsZXM6IFtmaWxlXSB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBjb25zdCBqb2IgPSBuZXcgU2ltcGxlSW50ZXJ2YWxKb2IoXHJcbiAgICAgIC8vICAgeyBzZWNvbmRzOiAxNSwgcnVuSW1tZWRpYXRlbHk6IHRydWUgfSxcclxuICAgICAgLy8gICB0YXNrLFxyXG4gICAgICAvLyAgIHtpZDogZGF0YS5jYXRlZ29yeX1cclxuICAgICAgLy8gKTtcclxuICAgICAgLy8gc2NoZWR1bGVyLmFkZFNpbXBsZUludGVydmFsSm9iKGpvYik7XHJcbiAgICAgIGNvbnN0IGpvYiA9IG5ldyBDcm9uSm9iKHtcclxuICAgICAgICBjcm9uRXhwcmVzc2lvbjogYDAgJHtkYXRhLmNyb25Ib3VyfSAqICogKmAsXHJcbiAgICAgIH0sIHRhc2ssIHtpZDogZGF0YS5jYXRlZ29yeX0pO1xyXG4gICAgICBzY2hlZHVsZXIuYWRkQ3JvbkpvYihqb2IpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGxvZ2dlci5lcnJvcihgY3JlYXRlT3JTdGFydFF1b3Rlc0pvYiAtPiBlcnJvcmApO1xyXG4gICAgbG9nZ2VyLmVycm9yKGVycm9yKVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc3RhcnRFeGlzdGluZ0Nyb25JbnN0YW5jZXMgPSBhc3luYyAoc3RhcnRFdmVudCkgPT4ge1xyXG4gIGNvbnN0IGluc3RhbmNlcyA9IGF3YWl0IGRiU2VydmljZS5nZXRBbGxRdW90ZXNJbnN0YW5jZXMoKTtcclxuICBpZiAoaW5zdGFuY2VzLmRhdGEgJiYgaW5zdGFuY2VzLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgaW5zdGFuY2VzLmRhdGEuZm9yRWFjaChhc3luYyAoaW5zdGFuY2U6IFF1b3RlSW5zdGFuY2UpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBjcmVhdGVPclN0YXJ0UXVvdGVzSm9iKGluc3RhbmNlLCBudWxsLCBzdGFydEV2ZW50KTtcclxuICAgICAgICBjb25zdCBjaGFubmVsID0gYXdhaXQgc3RhcnRFdmVudC5jaGFubmVscy5jYWNoZS5nZXQoYCR7cHJvY2Vzcy5lbnYuRElTQ09SRF9ERUJVR19DSEFOTkVMX0lEfWApO1xyXG4gICAgICAgIGlmIChjaGFubmVsKSB7XHJcbiAgICAgICAgICBhd2FpdCBjaGFubmVsLnNlbmQoYFF1b3RlcyBpbnN0YW5jZSBmb3IgY2F0ZWdvcnkgJHtpbnN0YW5jZS5jYXRlZ29yeX0gc3RhcnRlZGApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBsb2dnZXIuZXJyb3IoYHJlc3RhcnRFeGlzdGluZ0Nyb25JbnN0YW5jZXMgLT4gZXJyb3JgKTtcclxuICAgICAgICBsb2dnZXIuZXJyb3IoZXJyb3IpXHJcbiAgICAgICAgY29uc3QgY2hhbm5lbCA9IGF3YWl0IHN0YXJ0RXZlbnQuY2hhbm5lbHMuY2FjaGUuZ2V0KGAke3Byb2Nlc3MuZW52LkRJU0NPUkRfREVCVUdfQ0hBTk5FTF9JRH1gKTtcclxuICAgICAgICBpZiAoY2hhbm5lbCkge1xyXG4gICAgICAgICAgYXdhaXQgY2hhbm5lbC5zZW5kKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3RvcEFuZERlbGV0ZVF1b3Rlc0pvYiA9IGFzeW5jIChjYXRlZ29yeTogc3RyaW5nKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGxldCBpbnN0YW5jZSA9IGF3YWl0IGRiU2VydmljZS5nZXRRdW90ZXNJbnN0YW5jZShjYXRlZ29yeSk7XHJcbiAgICBpZiAoaW5zdGFuY2UuZGF0YSkge1xyXG4gICAgIGF3YWl0IGRiU2VydmljZS5kZWxldGVRdW90ZXNJbnN0YW5jZShjYXRlZ29yeSk7XHJcbiAgICAgc2NoZWR1bGVyLnN0b3BCeUlkKGNhdGVnb3J5KTtcclxuICAgICBzY2hlZHVsZXIucmVtb3ZlQnlJZChjYXRlZ29yeSk7XHJcbiAgICAgbG9nZ2VyLmluZm8oYFF1b3RlcyBpbnN0YW5jZSBmb3IgY2F0ZWdvcnkgJHtjYXRlZ29yeX0gc3RvcHBlZGApO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBsb2dnZXIuZXJyb3IoYHN0b3BBbmREZWxldGVRdW90ZXNKb2IgLT4gZXJyb3JgKTtcclxuICAgIGxvZ2dlci5lcnJvcihlcnJvcilcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIlRvYWRTY2hlZHVsZXIiLCJUYXNrIiwiQ3JvbkpvYiIsImRiU2VydmljZSIsInF1b3RlcyIsInBvc3RlZF9xdW90ZXMiLCJwYXRoIiwiZnMiLCJmaWxlVVJMVG9QYXRoIiwiUXVvdGVDYXRlZ29yeSIsIkF0dGFjaG1lbnRCdWlsZGVyIiwiQ29sb3JzIiwiRW1iZWRCdWlsZGVyIiwiYXhpb3MiLCJMb2dnZXIiLCJsb2dnZXIiLCJzY2hlZHVsZXIiLCJfX2ZpbGVuYW1lIiwidXJsIiwiX19kaXJuYW1lIiwiZGlybmFtZSIsImF0dGFjaG1lbnRzUGF0aCIsImpvaW4iLCJzd2l0Y2hFbWJlZENvbG9ycyIsImNhdGVnb3J5IiwiRnVubnkiLCJHb2xkIiwiSW5zcGlyYXRpb25hbCIsIkdyZWVuIiwiUHJvZ3JhbW1pbmciLCJEYXJrQXF1YSIsInN3aXRjaEVtYmVkQXR0YWNobWVudCIsImNyZWF0ZVF1b3Rlc0VtYmVkTWVzc2FnZSIsInF1b3RlIiwicXVvdGVFbWJlZCIsImF1dGhvciIsInNldEF1dGhvciIsIm5hbWUiLCJzZXRJbWFnZSIsImFkZEZpZWxkcyIsInZhbHVlIiwidGV4dCIsInNldENvbG9yIiwiZ2V0UmFuZG9tRnVubnlRdW90ZSIsInJlc3BvbnNlIiwiZ2V0IiwiaGVhZGVycyIsInByb2Nlc3MiLCJlbnYiLCJUSEVZX1NBSURfU09fQVBJX0tFWSIsImRhdGEiLCJjb250ZW50cyIsImVycm9yIiwiZ2V0SW5waXJhdGlvbmFsUXVvdGVPZlRoZURheSIsImdldFJhbmRvbVByb2dyYW1taW5nUXVvdGUiLCJhdmFpbGFibGVRdW90ZXMiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImlkIiwicG9zdGVkUXVvdGVzRmlsZVBhdGgiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwid3JpdGVGaWxlU3luYyIsIkpTT04iLCJzdHJpbmdpZnkiLCJyYW5kb21JbmRleCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInNlbGVjdGVkUXVvdGUiLCJwdXNoIiwiZW4iLCJjcmVhdGVPclN0YXJ0UXVvdGVzSm9iIiwiZXZlbnQiLCJzdGFydEV2ZW50Iiwic3dpdGNoUXVvdGVzSm9iIiwidGFzayIsImQiLCJpbnN0YW5jZSIsImdldFF1b3Rlc0luc3RhbmNlIiwiY3JlYXRlUXVvdGVzSW5zdGFuY2UiLCJmaWxlUGF0aCIsImZpbGUiLCJjaGFubmVsIiwibWVtYmVyIiwiZ3VpbGQiLCJjaGFubmVscyIsImNhY2hlIiwiY2hhbm5lbElkIiwiZW1iZWQiLCJzZW5kIiwiZW1iZWRzIiwiZmlsZXMiLCJqb2IiLCJjcm9uRXhwcmVzc2lvbiIsImNyb25Ib3VyIiwiYWRkQ3JvbkpvYiIsInJlc3RhcnRFeGlzdGluZ0Nyb25JbnN0YW5jZXMiLCJpbnN0YW5jZXMiLCJnZXRBbGxRdW90ZXNJbnN0YW5jZXMiLCJmb3JFYWNoIiwiRElTQ09SRF9ERUJVR19DSEFOTkVMX0lEIiwic3RvcEFuZERlbGV0ZVF1b3Rlc0pvYiIsImRlbGV0ZVF1b3Rlc0luc3RhbmNlIiwic3RvcEJ5SWQiLCJyZW1vdmVCeUlkIiwiaW5mbyJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsYUFBYSxFQUFFQyxJQUFJLEVBQUVDLE9BQU8sUUFBMkIsaUJBQWlCO0FBQ2pGLE9BQU9DLGVBQWUsK0JBQStCO0FBRXJELFNBQVFDLE1BQU0sUUFBTyxvQkFBb0I7QUFDekMsYUFBYTtBQUNiLFNBQVNDLGFBQWEsUUFBUSwwQ0FBMEM7QUFDeEUsT0FBT0MsVUFBVSxPQUFPO0FBQ3hCLE9BQU9DLFFBQVEsS0FBSztBQUNwQixTQUFTQyxhQUFhLFFBQVEsTUFBTTtBQUNwQyxTQUFTQyxhQUFhLFFBQWUsMEJBQTBCO0FBQy9ELFNBQVNDLGlCQUFpQixFQUFFQyxNQUFNLEVBQUVDLFlBQVksUUFBUSxhQUFhO0FBQ3JFLE9BQU9DLFdBQVcsUUFBUTtBQUMxQixTQUFTQyxNQUFNLFFBQVEsVUFBVTtBQUVqQyxNQUFNQyxTQUFTLElB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