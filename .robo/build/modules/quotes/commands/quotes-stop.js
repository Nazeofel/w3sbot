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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcbW9kdWxlc1xccXVvdGVzXFxjb21tYW5kc1xccXVvdGVzLXN0b3AudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdkb3RlbnYvY29uZmlnJ1xyXG5pbXBvcnQgdHlwZSB7IENvbW1hbmRDb25maWcgfSBmcm9tICdyb2JvLmpzJ1xyXG5pbXBvcnQgeyBjcmVhdGVPclN0YXJ0UXVvdGVzSm9iLCBzdG9wQW5kRGVsZXRlUXVvdGVzSm9iIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnO1xyXG5pbXBvcnQgeyBUb2FkU2NoZWR1bGVyLCBUYXNrLCBDcm9uSm9iLCBTaW1wbGVJbnRlcnZhbEpvYiB9IGZyb20gJ3RvYWQtc2NoZWR1bGVyJztcclxuaW1wb3J0IHsgUXVvdGVJbnN0YW5jZSwgUXVvdGVDYXRlZ29yeSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3R5cGVzLmpzJztcclxuaW1wb3J0IGRiU2VydmljZSBmcm9tICcuLi8uLi8uLi9kYi9zZXJ2aWNlL2luZGV4LmpzJztcclxuXHJcbmNvbnN0IHNjaGVkdWxlciA9IG5ldyBUb2FkU2NoZWR1bGVyKCk7XHJcblxyXG5jb25zdCBjYXRlZ29yeUNob2ljZXMgPSBbXTtcclxuZm9yIChjb25zdCBjYXRlZ29yeSBpbiBRdW90ZUNhdGVnb3J5KSB7XHJcbiAgY2F0ZWdvcnlDaG9pY2VzLnB1c2goe1xyXG4gICAgbmFtZTogY2F0ZWdvcnksXHJcbiAgICB2YWx1ZTogY2F0ZWdvcnkudG9Mb3dlckNhc2UoKVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjb25maWc6IENvbW1hbmRDb25maWcgPSB7XHJcbiAgZGVzY3JpcHRpb246ICdTVE9QUyBDUk9OIGpvYiBmb3IgYWN0aXZlIHF1b3RlcyBjYXRlZ29yeScsXHJcbiAgb3B0aW9uczogW1xyXG4gICAge1xyXG4gICAgICBuYW1lOiAnY2F0ZWdvcnknLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgZGVzY3JpcHRpb246ICdDaG9vc2UgcXVvdGUgY2F0ZWdvcnknLFxyXG4gICAgICBjaG9pY2VzOiBjYXRlZ29yeUNob2ljZXNcclxuICAgIH0sXHJcbiAgXVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZXZlbnQpID0+IHtcclxuICBjb25zdCBjYXRlZ29yeSA9IGV2ZW50Lm9wdGlvbnMuX2hvaXN0ZWRPcHRpb25zWzBdLnZhbHVlO1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBzdG9wQW5kRGVsZXRlUXVvdGVzSm9iKGNhdGVnb3J5KTtcclxuICAgIHJldHVybiB7IGNvbnRlbnQ6IGBRdW90ZXMgaW5zdGFuY2UgZm9yIGNhdGVnb3J5ICR7Y2F0ZWdvcnl9IHN0b3BwZWRgLCBlcGhlbWVyYWw6IHRydWUgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbInN0b3BBbmREZWxldGVRdW90ZXNKb2IiLCJUb2FkU2NoZWR1bGVyIiwiUXVvdGVDYXRlZ29yeSIsInNjaGVkdWxlciIsImNhdGVnb3J5Q2hvaWNlcyIsImNhdGVnb3J5IiwicHVzaCIsIm5hbWUiLCJ2YWx1ZSIsInRvTG93ZXJDYXNlIiwiY29uZmlnIiwiZGVzY3JpcHRpb24iLCJvcHRpb25zIiwicmVxdWlyZWQiLCJjaG9pY2VzIiwiZXZlbnQiLCJfaG9pc3RlZE9wdGlvbnMiLCJjb250ZW50IiwiZXBoZW1lcmFsIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGdCQUFlO0FBRXRCLFNBQWlDQSxzQkFBc0IsUUFBUSxvQkFBb0I7QUFDbkYsU0FBU0MsYUFBYSxRQUEwQyxpQkFBaUI7QUFDakYsU0FBd0JDLGFBQWEsUUFBUSwwQkFBMEI7QUFHdkUsTUFBTUMsWUFBWSxJQUFJRjtBQUV0QixNQUFNRyxrQkFBa0IsRUFBRTtBQUMxQixJQUFLLE1BQU1DLFlBQVlILGNBQWU7SUFDcENFLGdCQUFnQkUsSUFBSSxDQUFDO1FBQ25CQyxNQUFNRjtRQUNORyxPQUFPSCxTQUFTSSxXQUFXO0lBQzdCO0FBQ0Y7QUFFQSxPQUFPLE1BQU1DLFNBQXdCO0lBQ25DQyxhQUFhO0lBQ2JDLFNBQVM7UUFDUDtZQUNFTCxNQUFNO1lBQ05NLFVBQVU7WUFDVkYsYUFBYTtZQUNiRyxTQUFTVjtRQUNYO0tBQ0Q7QUFDSCxFQUFDO0FBRUQsZUFBZSxDQUFBLE9BQU9XO0lBQ3BCLE1BQU1WLFdBQVdVLE1BQU1ILE9BQU8sQ0FBQ0ksZUFBZSxDQUFDLEVBQUUsQ0FBQ1IsS0FBSztJQUN2RCxJQUFJO1FBQ0YsTUFBTVIsdUJBQXVCSztRQUM3QixPQUFPO1lBQUVZLFNBQVMsQ0FBQyw2QkFBNkIsRUFBRVosU0FBUyxRQUFRLENBQUM7WUFBRWEsV0FBVztRQUFLO0lBQ3hGLEVBQUUsT0FBT0MsT0FBTztRQUNkQyxRQUFRQyxHQUFHLENBQUNGO0lBQ2Q7QUFDRixDQUFBLEVBQUMifQ==