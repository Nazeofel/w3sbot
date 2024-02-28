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
        console.error("Error: " + error.message);
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
        console.error("Error: " + error.message);
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
        console.log(error);
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
                console.log(error);
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
        }
    } catch (error) {
        console.log(error);
    }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxxdW90ZXNcXHV0aWxzXFx1dGlscy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb2FkU2NoZWR1bGVyLCBUYXNrLCBDcm9uSm9iLCBTaW1wbGVJbnRlcnZhbEpvYiB9IGZyb20gJ3RvYWQtc2NoZWR1bGVyJztcclxuaW1wb3J0IGRiU2VydmljZSBmcm9tICcuLi8uLi8uLi9kYi9zZXJ2aWNlL2luZGV4LmpzJztcclxuaW1wb3J0IHsgUXVvdGVJbnN0YW5jZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3R5cGVzLmpzJztcclxuaW1wb3J0IHtxdW90ZXN9IGZyb20gJy4uL2RhdGEvcXVvdGVzLmpzJztcclxuLy8gQHRzLWlnbm9yZVxyXG5pbXBvcnQgeyBwb3N0ZWRfcXVvdGVzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc3RhdGljcy9wb3N0ZWQtcXVvdGVzLmpzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xyXG5pbXBvcnQgeyBRdW90ZUNhdGVnb3J5LCBRdW90ZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3R5cGVzLmpzJztcclxuaW1wb3J0IHsgQXR0YWNobWVudEJ1aWxkZXIsIENvbG9ycywgRW1iZWRCdWlsZGVyIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcblxyXG5jb25zdCBzY2hlZHVsZXIgPSBuZXcgVG9hZFNjaGVkdWxlcigpO1xyXG5jb25zdCBfX2ZpbGVuYW1lID0gZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpO1xyXG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoX19maWxlbmFtZSk7XHJcbmNvbnN0IGF0dGFjaG1lbnRzUGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8uLi8uLi9hc3NldHMvJyk7XHJcblxyXG5jb25zdCBzd2l0Y2hFbWJlZENvbG9ycyA9IChjYXRlZ29yeTogUXVvdGVDYXRlZ29yeSkgPT4ge1xyXG4gIHN3aXRjaCAoY2F0ZWdvcnkpIHtcclxuICAgIGNhc2UgUXVvdGVDYXRlZ29yeS5GdW5ueTpcclxuICAgICAgcmV0dXJuIENvbG9ycy5Hb2xkO1xyXG4gICAgY2FzZSBRdW90ZUNhdGVnb3J5Lkluc3BpcmF0aW9uYWw6XHJcbiAgICAgIHJldHVybiBDb2xvcnMuR3JlZW47XHJcbiAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuUHJvZ3JhbW1pbmc6XHJcbiAgICAgIHJldHVybiBDb2xvcnMuRGFya0FxdWE7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBzd2l0Y2hFbWJlZEF0dGFjaG1lbnQgPSAoY2F0ZWdvcnk6IFF1b3RlQ2F0ZWdvcnkpID0+IHtcclxuICBzd2l0Y2ggKGNhdGVnb3J5KSB7XHJcbiAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuRnVubnk6XHJcbiAgICAgIHJldHVybiAnZGFpbHktZnVubnktaW1hZ2UnO1xyXG4gICAgY2FzZSBRdW90ZUNhdGVnb3J5Lkluc3BpcmF0aW9uYWw6XHJcbiAgICAgIHJldHVybiAnZGFpbHktaW5zcGlyYXRpb25hbC1pbWFnZSc7XHJcbiAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuUHJvZ3JhbW1pbmc6XHJcbiAgICAgIHJldHVybiAnZGFpbHktcHJvZ3JhbW1pbmctaW1hZ2UnO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgY3JlYXRlUXVvdGVzRW1iZWRNZXNzYWdlID0gYXN5bmMgKGNhdGVnb3J5OiBRdW90ZUNhdGVnb3J5LCBxdW90ZTogUXVvdGUpID0+IHtcclxuICBjb25zdCBxdW90ZUVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpO1xyXG5cclxuXHRpZiAocXVvdGUuYXV0aG9yKSB7XHJcbiAgICBxdW90ZUVtYmVkLnNldEF1dGhvcih7IG5hbWU6IGAke3F1b3RlLmF1dGhvcn1gfSk7XHJcbiAgfVxyXG5cdHF1b3RlRW1iZWRcclxuICAuc2V0SW1hZ2UoYGF0dGFjaG1lbnQ6Ly8ke3N3aXRjaEVtYmVkQXR0YWNobWVudChjYXRlZ29yeSl9LnBuZ2ApXHJcblx0LmFkZEZpZWxkcyhcclxuXHRcdHsgbmFtZTogJ1xcbicsIHZhbHVlOiAnYGBgeWFtbFxcbicgKyBxdW90ZS50ZXh0ICsgJ1xcbmBgYCd9XHJcblx0KVxyXG4gIC5zZXRDb2xvcihzd2l0Y2hFbWJlZENvbG9ycyhjYXRlZ29yeSkpO1xyXG5cclxuICByZXR1cm4gcXVvdGVFbWJlZDtcclxufVxyXG5cclxuY29uc3QgZ2V0UmFuZG9tRnVubnlRdW90ZSA9IGFzeW5jICgpOiBQcm9taXNlPFF1b3RlPiA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KFwiaHR0cHM6Ly9xdW90ZXMucmVzdC9xb2Q/Y2F0ZWdvcnk9ZnVubnkmbGFuZ3VhZ2U9ZW5cIiwge1xyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgXCJYLVRoZXlTYWlkU28tQXBpLVNlY3JldFwiOiBgJHtwcm9jZXNzLmVudi5USEVZX1NBSURfU09fQVBJX0tFWX1gLFxyXG4gICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7cHJvY2Vzcy5lbnYuVEhFWV9TQUlEX1NPX0FQSV9LRVl9YCxcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YS5jb250ZW50cy5xdW90ZXNbMF07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhdXRob3I6IGRhdGEuYXV0aG9yLFxyXG4gICAgICB0ZXh0OiBkYXRhLnF1b3RlXHJcbiAgICB9O1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IFwiICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0SW5waXJhdGlvbmFsUXVvdGVPZlRoZURheSA9IGFzeW5jICgpOiBQcm9taXNlPFF1b3RlPiA9PiB7IFxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChcImh0dHBzOi8vcXVvdGVzLnJlc3QvcW9kP2NhdGVnb3J5PWluc3BpcmUmbGFuZ3VhZ2U9ZW5cIiwge1xyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgXCJYLVRoZXlTYWlkU28tQXBpLVNlY3JldFwiOiBgJHtwcm9jZXNzLmVudi5USEVZX1NBSURfU09fQVBJX0tFWX1gLFxyXG4gICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7cHJvY2Vzcy5lbnYuVEhFWV9TQUlEX1NPX0FQSV9LRVl9YCxcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YS5jb250ZW50cy5xdW90ZXNbMF07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhdXRob3I6IGRhdGEuYXV0aG9yLFxyXG4gICAgICB0ZXh0OiBkYXRhLnF1b3RlXHJcbiAgICB9O1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IFwiICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBnZXRSYW5kb21Qcm9ncmFtbWluZ1F1b3RlID0gYXN5bmMgKCk6IFByb21pc2U8UXVvdGU+ID0+IHtcclxuICBsZXQgYXZhaWxhYmxlUXVvdGVzID0gcXVvdGVzLmZpbHRlcihxdW90ZSA9PiAhcG9zdGVkX3F1b3Rlcy5pbmNsdWRlcyhxdW90ZS5pZCkpO1xyXG4gIGNvbnN0IHBvc3RlZFF1b3Rlc0ZpbGVQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uLy4uLy4uLy4uL3N0YXRpY3MvcG9zdGVkLXF1b3Rlcy5qcycpO1xyXG4gIC8vIElmIHRoZXJlIGlzIG5vIHF1b3RlcyBsZWZ0IHRvIHBvc3QsIHJlc2V0IHBvc3RlZCBxdW90ZXNcclxuICBpZiAoYXZhaWxhYmxlUXVvdGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgY29uc29sZS5sb2coJ05vIHF1b3RlcyBsZWZ0IHRvIHBvc3QsIHJlc2V0dGluZyBwb3N0ZWQgcXVvdGVzJylcclxuICAgIGZzLndyaXRlRmlsZVN5bmMocG9zdGVkUXVvdGVzRmlsZVBhdGgsIGBleHBvcnQgY29uc3QgcG9zdGVkX3F1b3RlcyA9ICR7SlNPTi5zdHJpbmdpZnkoW10sIG51bGwsIDIpfTtgKTtcclxuICAgIGF2YWlsYWJsZVF1b3RlcyA9IHF1b3RlcztcclxuICB9XHJcblxyXG4gIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlUXVvdGVzLmxlbmd0aCk7XHJcbiAgY29uc3Qgc2VsZWN0ZWRRdW90ZSA9IGF2YWlsYWJsZVF1b3Rlc1tyYW5kb21JbmRleF07XHJcblxyXG4gIHBvc3RlZF9xdW90ZXMucHVzaChzZWxlY3RlZFF1b3RlLmlkKTtcclxuICBmcy53cml0ZUZpbGVTeW5jKHBvc3RlZFF1b3Rlc0ZpbGVQYXRoLCBgZXhwb3J0IGNvbnN0IHBvc3RlZF9xdW90ZXMgPSAke0pTT04uc3RyaW5naWZ5KHBvc3RlZF9xdW90ZXMsIG51bGwsIDIpfTtgKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGlkOiBzZWxlY3RlZFF1b3RlLmlkLFxyXG4gICAgYXV0aG9yOiBzZWxlY3RlZFF1b3RlLmF1dGhvcixcclxuICAgIHRleHQ6IHNlbGVjdGVkUXVvdGUuZW5cclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlT3JTdGFydFF1b3Rlc0pvYiA9IGFzeW5jIChkYXRhOiBRdW90ZUluc3RhbmNlLCBldmVudDogYW55LCBzdGFydEV2ZW50PzogYW55KSA9PiB7XHJcbiAgY29uc3Qgc3dpdGNoUXVvdGVzSm9iID0gYXN5bmMgKGNhdGVnb3J5OiBRdW90ZUNhdGVnb3J5KSA9PiB7XHJcbiAgICBzd2l0Y2ggKGNhdGVnb3J5KSB7XHJcbiAgICAgIGNhc2UgUXVvdGVDYXRlZ29yeS5GdW5ueTpcclxuICAgICAgICByZXR1cm4gYXdhaXQgZ2V0UmFuZG9tRnVubnlRdW90ZSgpO1xyXG4gICAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuSW5zcGlyYXRpb25hbDpcclxuICAgICAgICByZXR1cm4gYXdhaXQgZ2V0SW5waXJhdGlvbmFsUXVvdGVPZlRoZURheSgpO1xyXG4gICAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuUHJvZ3JhbW1pbmc6XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGdldFJhbmRvbVByb2dyYW1taW5nUXVvdGUoKTtcclxuICAgIH1cclxuICB9XHJcbiAgICBcclxuICB0cnkge1xyXG4gICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKFxyXG4gICAgICBgJHtkYXRhLmNhdGVnb3J5fS10YXNrYCwgYXN5bmMgKCkgPT4geyBcclxuICAgICAgICBjb25zdCBkID0gZGF0YTtcclxuICAgICAgICBsZXQgaW5zdGFuY2UgPSAoYXdhaXQgZGJTZXJ2aWNlLmdldFF1b3Rlc0luc3RhbmNlKGQuY2F0ZWdvcnkpKS5kYXRhO1xyXG4gICAgICAgIGlmICghaW5zdGFuY2UpIHtcclxuICAgICAgICAgaW5zdGFuY2UgPSAoYXdhaXQgZGJTZXJ2aWNlLmNyZWF0ZVF1b3Rlc0luc3RhbmNlKGQpKS5kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXR0YWNobWVudHNQYXRoLCBgJHtzd2l0Y2hFbWJlZEF0dGFjaG1lbnQoZGF0YS5jYXRlZ29yeSl9LnBuZ2ApO1xyXG4gICAgICAgIGNvbnN0IGZpbGUgPSBuZXcgQXR0YWNobWVudEJ1aWxkZXIoZmlsZVBhdGgsIHtcclxuICAgICAgICAgIG5hbWU6IGAke3N3aXRjaEVtYmVkQXR0YWNobWVudChkYXRhLmNhdGVnb3J5KX0ucG5nYFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBjaGFubmVsO1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgY2hhbm5lbCA9IGF3YWl0IGV2ZW50Lm1lbWJlci5ndWlsZC5jaGFubmVscy5jYWNoZS5nZXQoaW5zdGFuY2UuY2hhbm5lbElkKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdFdmVudCBwcm92aWRlZCcpXHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGFydEV2ZW50KSB7XHJcbiAgICAgICAgICBjaGFubmVsID0gYXdhaXQgc3RhcnRFdmVudC5jaGFubmVscy5jYWNoZS5nZXQoZGF0YS5jaGFubmVsSWQpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1N0YXJ0IGV2ZW50IHByb3ZpZGVkJylcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcXVvdGUgPSBhd2FpdCBzd2l0Y2hRdW90ZXNKb2IoZC5jYXRlZ29yeSk7XHJcbiAgICAgICAgY29uc3QgZW1iZWQgPSBhd2FpdCBjcmVhdGVRdW90ZXNFbWJlZE1lc3NhZ2UoZC5jYXRlZ29yeSwgcXVvdGUpO1xyXG4gICAgICAgIGF3YWl0IGNoYW5uZWwuc2VuZCh7IGVtYmVkczogW2VtYmVkXSwgZmlsZXM6IFtmaWxlXSB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBjb25zdCBqb2IgPSBuZXcgU2ltcGxlSW50ZXJ2YWxKb2IoXHJcbiAgICAgIC8vICAgeyBzZWNvbmRzOiAxNSwgcnVuSW1tZWRpYXRlbHk6IHRydWUgfSxcclxuICAgICAgLy8gICB0YXNrLFxyXG4gICAgICAvLyAgIHtpZDogZGF0YS5jYXRlZ29yeX1cclxuICAgICAgLy8gKTtcclxuICAgICAgLy8gc2NoZWR1bGVyLmFkZFNpbXBsZUludGVydmFsSm9iKGpvYik7XHJcbiAgICAgIGNvbnN0IGpvYiA9IG5ldyBDcm9uSm9iKHtcclxuICAgICAgICBjcm9uRXhwcmVzc2lvbjogYDAgJHtkYXRhLmNyb25Ib3VyfSAqICogKmAsXHJcbiAgICAgIH0sIHRhc2ssIHtpZDogZGF0YS5jYXRlZ29yeX0pO1xyXG4gICAgICBzY2hlZHVsZXIuYWRkQ3JvbkpvYihqb2IpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc3RhcnRFeGlzdGluZ0Nyb25JbnN0YW5jZXMgPSBhc3luYyAoc3RhcnRFdmVudCkgPT4geyBcclxuICBjb25zdCBpbnN0YW5jZXMgPSBhd2FpdCBkYlNlcnZpY2UuZ2V0QWxsUXVvdGVzSW5zdGFuY2VzKCk7XHJcbiAgaWYgKGluc3RhbmNlcy5kYXRhICYmIGluc3RhbmNlcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgIGluc3RhbmNlcy5kYXRhLmZvckVhY2goYXN5bmMgKGluc3RhbmNlOiBRdW90ZUluc3RhbmNlKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgY3JlYXRlT3JTdGFydFF1b3Rlc0pvYihpbnN0YW5jZSwgbnVsbCwgc3RhcnRFdmVudCk7XHJcbiAgICAgICAgY29uc3QgY2hhbm5lbCA9IGF3YWl0IHN0YXJ0RXZlbnQuY2hhbm5lbHMuY2FjaGUuZ2V0KGAke3Byb2Nlc3MuZW52LkRJU0NPUkRfREVCVUdfQ0hBTk5FTF9JRH1gKTtcclxuICAgICAgICBpZiAoY2hhbm5lbCkge1xyXG4gICAgICAgICAgYXdhaXQgY2hhbm5lbC5zZW5kKGBRdW90ZXMgaW5zdGFuY2UgZm9yIGNhdGVnb3J5ICR7aW5zdGFuY2UuY2F0ZWdvcnl9IHN0YXJ0ZWRgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgY29uc3QgY2hhbm5lbCA9IGF3YWl0IHN0YXJ0RXZlbnQuY2hhbm5lbHMuY2FjaGUuZ2V0KGAke3Byb2Nlc3MuZW52LkRJU0NPUkRfREVCVUdfQ0hBTk5FTF9JRH1gKTtcclxuICAgICAgICBpZiAoY2hhbm5lbCkge1xyXG4gICAgICAgICAgYXdhaXQgY2hhbm5lbC5zZW5kKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3RvcEFuZERlbGV0ZVF1b3Rlc0pvYiA9IGFzeW5jIChjYXRlZ29yeTogc3RyaW5nKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGxldCBpbnN0YW5jZSA9IGF3YWl0IGRiU2VydmljZS5nZXRRdW90ZXNJbnN0YW5jZShjYXRlZ29yeSk7XHJcbiAgICBpZiAoaW5zdGFuY2UuZGF0YSkge1xyXG4gICAgIGF3YWl0IGRiU2VydmljZS5kZWxldGVRdW90ZXNJbnN0YW5jZShjYXRlZ29yeSk7XHJcbiAgICAgc2NoZWR1bGVyLnN0b3BCeUlkKGNhdGVnb3J5KTtcclxuICAgICBzY2hlZHVsZXIucmVtb3ZlQnlJZChjYXRlZ29yeSk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJUb2FkU2NoZWR1bGVyIiwiVGFzayIsIkNyb25Kb2IiLCJkYlNlcnZpY2UiLCJxdW90ZXMiLCJwb3N0ZWRfcXVvdGVzIiwicGF0aCIsImZzIiwiZmlsZVVSTFRvUGF0aCIsIlF1b3RlQ2F0ZWdvcnkiLCJBdHRhY2htZW50QnVpbGRlciIsIkNvbG9ycyIsIkVtYmVkQnVpbGRlciIsImF4aW9zIiwic2NoZWR1bGVyIiwiX19maWxlbmFtZSIsInVybCIsIl9fZGlybmFtZSIsImRpcm5hbWUiLCJhdHRhY2htZW50c1BhdGgiLCJqb2luIiwic3dpdGNoRW1iZWRDb2xvcnMiLCJjYXRlZ29yeSIsIkZ1bm55IiwiR29sZCIsIkluc3BpcmF0aW9uYWwiLCJHcmVlbiIsIlByb2dyYW1taW5nIiwiRGFya0FxdWEiLCJzd2l0Y2hFbWJlZEF0dGFjaG1lbnQiLCJjcmVhdGVRdW90ZXNFbWJlZE1lc3NhZ2UiLCJxdW90ZSIsInF1b3RlRW1iZWQiLCJhdXRob3IiLCJzZXRBdXRob3IiLCJuYW1lIiwic2V0SW1hZ2UiLCJhZGRGaWVsZHMiLCJ2YWx1ZSIsInRleHQiLCJzZXRDb2xvciIsImdldFJhbmRvbUZ1bm55UXVvdGUiLCJyZXNwb25zZSIsImdldCIsImhlYWRlcnMiLCJwcm9jZXNzIiwiZW52IiwiVEhFWV9TQUlEX1NPX0FQSV9LRVkiLCJkYXRhIiwiY29udGVudHMiLCJlcnJvciIsImNvbnNvbGUiLCJtZXNzYWdlIiwiZ2V0SW5waXJhdGlvbmFsUXVvdGVPZlRoZURheSIsImdldFJhbmRvbVByb2dyYW1taW5nUXVvdGUiLCJhdmFpbGFibGVRdW90ZXMiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImlkIiwicG9zdGVkUXVvdGVzRmlsZVBhdGgiLCJsZW5ndGgiLCJsb2ciLCJ3cml0ZUZpbGVTeW5jIiwiSlNPTiIsInN0cmluZ2lmeSIsInJhbmRvbUluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwic2VsZWN0ZWRRdW90ZSIsInB1c2giLCJlbiIsImNyZWF0ZU9yU3RhcnRRdW90ZXNKb2IiLCJldmVudCIsInN0YXJ0RXZlbnQiLCJzd2l0Y2hRdW90ZXNKb2IiLCJ0YXNrIiwiZCIsImluc3RhbmNlIiwiZ2V0UXVvdGVzSW5zdGFuY2UiLCJjcmVhdGVRdW90ZXNJbnN0YW5jZSIsImZpbGVQYXRoIiwiZmlsZSIsImNoYW5uZWwiLCJtZW1iZXIiLCJndWlsZCIsImNoYW5uZWxzIiwiY2FjaGUiLCJjaGFubmVsSWQiLCJlbWJlZCIsInNlbmQiLCJlbWJlZHMiLCJmaWxlcyIsImpvYiIsImNyb25FeHByZXNzaW9uIiwiY3JvbkhvdXIiLCJhZGRDcm9uSm9iIiwicmVzdGFydEV4aXN0aW5nQ3Jvbkluc3RhbmNlcyIsImluc3RhbmNlcyIsImdldEFsbFF1b3Rlc0luc3RhbmNlcyIsImZvckVhY2giLCJESVNDT1JEX0RFQlVHX0NIQU5ORUxfSUQiLCJzdG9wQW5kRGVsZXRlUXVvdGVzSm9iIiwiZGVsZXRlUXVvdGVzSW5zdGFuY2UiLCJzdG9wQnlJZCIsInJlbW92ZUJ5SWQiXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLGFBQWEsRUFBRUMsSUFBSSxFQUFFQyxPQUFPLFFBQTJCLGlCQUFpQjtBQUNqRixPQUFPQyxlQUFlLCtCQUErQjtBQUVyRCxTQUFRQyxNQUFNLFFBQU8sb0JBQW9CO0FBQ3pDLGFBQWE7QUFDYixTQUFTQyxhQUFhLFFBQVEsMENBQTBDO0FBQ3hFLE9BQU9DLFVBQVUsT0FBTztBQUN4QixPQUFPQyxRQUFRLEtBQUs7QUFDcEIsU0FBU0MsYUFBYSxRQUFRLE1BQU07QUFDcEMsU0FBU0MsYUFBYSxRQUFlLDBCQUEwQjtBQUMvRCxTQUFTQyxpQkFBaUIsRUFBRUMsTUFBTSxFQUFFQyxZQUFZLFFBQVEsYUFBYTtBQUNyRSxPQUFPQyxXQUFXLFFBQVE7QUFFMUIsTUFBTUMsWUFBWSxJQUFJZDtBQUN0QixNQUFNZSxhQUFhUCxjQUFjLFlBQVlRLEdBQUc7QUFDaEQsTUFBTUMsWUFBWVgsS0FBS1ksT0FBTyxDQUFDSDtBQUMvQixNQUFNSSxrQkFBa0JiLEtBQUtjLElBQUksQ0FBQ0gsV0FBVztBQUU3QyxNQUFNSSxvQkFBb0IsQ0FBQ0M7SUFDekIsT0FBUUE7UUFDTixLQUFLYixjQUFjYyxLQUFLO1lBQ3RCLE9BQU9aLE9BQU9hLElBQUk7UUFDcEIsS0FBS2YsY0FBY2dCLGFBQWE7WUFDOUIsT0FBT2QsT0FBT2UsS0FBSztRQUNyQixLQUFLakIsY0FBY2tCLFdBQVc7WUFDNUIsT0FBT2hCLE9BQU9pQixRQUFRO0lBQzFCO0FBQ0Y7QUFFQSxNQUFNQyx3QkFBd0IsQ0FBQ1A7SUFDN0IsT0FBUUE7UUFDTixLQUFLYixjQUFjYyxLQUFLO1lBQ3RCLE9BQU87UUFDVCxLQUFLZCxjQUFjZ0IsYUFBYTtZQUM5QixPQUFPO1FBQ1QsS0FBS2hCLGNBQWNrQixXQUFXO1lBQzVCLE9BQU87SUFDWDtBQUNGO0FBRUEsTUFB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