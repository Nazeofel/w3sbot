import "dotenv/config";
import { createOrStartQuotesJob } from "../utils/utils.js";
import { QuoteCategory } from "../../../types/types.js";
const timeChoices = [];
for(let i = 1; i <= 24; i++){
    const time = i < 10 ? `0${i}` : i;
    timeChoices.push({
        name: `At ${time}:00`,
        value: i.toString()
    });
}
const categoryChoices = [];
for(const category in QuoteCategory){
    categoryChoices.push({
        name: category,
        value: category.toLowerCase()
    });
}
export const config = {
    description: 'Starts CRON job for sending quotes in set interval',
    options: [
        {
            name: 'channel',
            required: true,
            description: 'Choose a channel'
        },
        {
            name: 'category',
            required: true,
            description: 'Choose quote category',
            choices: categoryChoices
        },
        {
            name: 'time',
            required: true,
            description: 'Once a day, at: ',
            choices: timeChoices
        }
    ]
};
export default (async (event)=>{
    const channelId = event.options._hoistedOptions[0].value.replace(/[<>\#]/g, '');
    const category = event.options._hoistedOptions[1].value;
    const time = Number(event.options._hoistedOptions[2].value);
    const data = {
        channelId: channelId,
        category: category,
        isRunning: 1,
        cronId: category,
        cronHour: time
    };
    const success = createOrStartQuotesJob(data, event);
    if (success) {
        return {
            content: `Quotes instance for category ${category} started`,
            ephemeral: true
        };
    } else {
        return {
            content: `Failed to start quotes instance for category ${category}`,
            ephemeral: true
        };
    }
});
