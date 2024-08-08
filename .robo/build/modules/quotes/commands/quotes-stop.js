import "dotenv/config";
import { stopAndDeleteQuotesJob } from "../utils/utils.js";
import { ToadScheduler } from "toad-scheduler";
import { QuoteCategory } from "../../../types/types.js";
const scheduler = new ToadScheduler();
const categoryChoices = [];
for(const category in QuoteCategory){
    categoryChoices.push({
        name: category,
        value: category.toLowerCase()
    });
}
export const config = {
    description: 'STOPS CRON job for active quotes category',
    options: [
        {
            name: 'category',
            required: true,
            description: 'Choose quote category',
            choices: categoryChoices
        }
    ]
};
export default (async (event)=>{
    const category = event.options._hoistedOptions[0].value;
    try {
        await stopAndDeleteQuotesJob(category);
        return {
            content: `Quotes instance for category ${category} stopped`,
            ephemeral: true
        };
    } catch (error) {
        console.log(error);
    }
});
