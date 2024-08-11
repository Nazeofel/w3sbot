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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcbW9kdWxlc1xccXVvdGVzXFxjb21tYW5kc1xccXVvdGVzLXN0YXJ0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnZG90ZW52L2NvbmZpZydcclxuaW1wb3J0IHR5cGUgeyBDb21tYW5kQ29uZmlnIH0gZnJvbSAncm9iby5qcydcclxuaW1wb3J0IHsgY3JlYXRlT3JTdGFydFF1b3Rlc0pvYiB9IGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJztcclxuaW1wb3J0IHsgUXVvdGVJbnN0YW5jZSwgUXVvdGVDYXRlZ29yeSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3R5cGVzLmpzJztcclxuXHJcbmNvbnN0IHRpbWVDaG9pY2VzID0gW107XHJcbmZvciAobGV0IGkgPSAxOyBpIDw9IDI0OyBpKyspIHtcclxuICBjb25zdCB0aW1lID0gaSA8IDEwID8gYDAke2l9YCA6IGk7XHJcbiAgdGltZUNob2ljZXMucHVzaCh7XHJcbiAgICBuYW1lOiBgQXQgJHt0aW1lfTowMGAsXHJcbiAgICB2YWx1ZTogaS50b1N0cmluZygpXHJcbiAgfSlcclxufVxyXG5cclxuY29uc3QgY2F0ZWdvcnlDaG9pY2VzID0gW107XHJcbmZvciAoY29uc3QgY2F0ZWdvcnkgaW4gUXVvdGVDYXRlZ29yeSkge1xyXG4gIGNhdGVnb3J5Q2hvaWNlcy5wdXNoKHtcclxuICAgIG5hbWU6IGNhdGVnb3J5LFxyXG4gICAgdmFsdWU6IGNhdGVnb3J5LnRvTG93ZXJDYXNlKClcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnOiBDb21tYW5kQ29uZmlnID0ge1xyXG4gIGRlc2NyaXB0aW9uOiAnU3RhcnRzIENST04gam9iIGZvciBzZW5kaW5nIHF1b3RlcyBpbiBzZXQgaW50ZXJ2YWwnLFxyXG4gIG9wdGlvbnM6IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2NoYW5uZWwnLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgZGVzY3JpcHRpb246ICdDaG9vc2UgYSBjaGFubmVsJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2NhdGVnb3J5JyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ2hvb3NlIHF1b3RlIGNhdGVnb3J5JyxcclxuICAgICAgY2hvaWNlczogY2F0ZWdvcnlDaG9pY2VzXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAndGltZScsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ09uY2UgYSBkYXksIGF0OiAnLFxyXG4gICAgICBjaG9pY2VzOiB0aW1lQ2hvaWNlc1xyXG4gICAgfSxcclxuICBdXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChldmVudCkgPT4ge1xyXG4gIGNvbnN0IGNoYW5uZWxJZCA9IGV2ZW50Lm9wdGlvbnMuX2hvaXN0ZWRPcHRpb25zWzBdLnZhbHVlLnJlcGxhY2UoL1s8PlxcI10vZywgJycpO1xyXG4gIGNvbnN0IGNhdGVnb3J5ID0gZXZlbnQub3B0aW9ucy5faG9pc3RlZE9wdGlvbnNbMV0udmFsdWU7XHJcbiAgY29uc3QgdGltZSA9IE51bWJlcihldmVudC5vcHRpb25zLl9ob2lzdGVkT3B0aW9uc1syXS52YWx1ZSk7XHJcblxyXG4gIGNvbnN0IGRhdGE6IFF1b3RlSW5zdGFuY2UgPSB7XHJcbiAgICBjaGFubmVsSWQ6IGNoYW5uZWxJZCxcclxuICAgIGNhdGVnb3J5OiBjYXRlZ29yeSxcclxuICAgIGlzUnVubmluZzogMSxcclxuICAgIGNyb25JZDogY2F0ZWdvcnksXHJcbiAgICBjcm9uSG91cjogdGltZVxyXG4gIH1cclxuXHJcbiAgY29uc3Qgc3VjY2VzcyA9IGNyZWF0ZU9yU3RhcnRRdW90ZXNKb2IoZGF0YSwgZXZlbnQpO1xyXG4gIGlmIChzdWNjZXNzKSB7XHJcbiAgICByZXR1cm4geyBjb250ZW50OiBgUXVvdGVzIGluc3RhbmNlIGZvciBjYXRlZ29yeSAke2NhdGVnb3J5fSBzdGFydGVkYCwgZXBoZW1lcmFsOiB0cnVlIH1cclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHsgY29udGVudDogYEZhaWxlZCB0byBzdGFydCBxdW90ZXMgaW5zdGFuY2UgZm9yIGNhdGVnb3J5ICR7Y2F0ZWdvcnl9YCwgZXBoZW1lcmFsOiB0cnVlIH1cclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImNyZWF0ZU9yU3RhcnRRdW90ZXNKb2IiLCJRdW90ZUNhdGVnb3J5IiwidGltZUNob2ljZXMiLCJpIiwidGltZSIsInB1c2giLCJuYW1lIiwidmFsdWUiLCJ0b1N0cmluZyIsImNhdGVnb3J5Q2hvaWNlcyIsImNhdGVnb3J5IiwidG9Mb3dlckNhc2UiLCJjb25maWciLCJkZXNjcmlwdGlvbiIsIm9wdGlvbnMiLCJyZXF1aXJlZCIsImNob2ljZXMiLCJldmVudCIsImNoYW5uZWxJZCIsIl9ob2lzdGVkT3B0aW9ucyIsInJlcGxhY2UiLCJOdW1iZXIiLCJkYXRhIiwiaXNSdW5uaW5nIiwiY3JvbklkIiwiY3JvbkhvdXIiLCJzdWNjZXNzIiwiY29udGVudCIsImVwaGVtZXJhbCJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxnQkFBZTtBQUV0QixTQUFTQSxzQkFBc0IsUUFBUSxvQkFBb0I7QUFDM0QsU0FBd0JDLGFBQWEsUUFBUSwwQkFBMEI7QUFFdkUsTUFBTUMsY0FBYyxFQUFFO0FBQ3RCLElBQUssSUFBSUMsSUFBSSxHQUFHQSxLQUFLLElBQUlBLElBQUs7SUFDNUIsTUFBTUMsT0FBT0QsSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFQSxFQUFFLENBQUMsR0FBR0E7SUFDaENELFlBQVlHLElBQUksQ0FBQztRQUNmQyxNQUFNLENBQUMsR0FBRyxFQUFFRixLQUFLLEdBQUcsQ0FBQztRQUNyQkcsT0FBT0osRUFBRUssUUFBUTtJQUNuQjtBQUNGO0FBRUEsTUFBTUMsa0JBQWtCLEVBQUU7QUFDMUIsSUFBSyxNQUFNQyxZQUFZVCxjQUFlO0lBQ3BDUSxnQkFBZ0JKLElBQUksQ0FBQztRQUNuQkMsTUFBTUk7UUFDTkgsT0FBT0csU0FBU0MsV0FBVztJQUM3QjtBQUNGO0FBRUEsT0FBTyxNQUFNQyxTQUF3QjtJQUNuQ0MsYUFBYTtJQUNiQyxTQUFTO1FBQ1A7WUFDRVIsTUFBTTtZQUNOUyxVQUFVO1lBQ1ZGLGFBQWE7UUFDZjtRQUNBO1lBQ0VQLE1BQU07WUFDTlMsVUFBVTtZQUNWRixhQUFhO1lBQ2JHLFNBQVNQO1FBQ1g7UUFDQTtZQUNFSCxNQUFNO1lBQ05TLFVBQVU7WUFDVkYsYUFBYTtZQUNiRyxTQUFTZDtRQUNYO0tBQ0Q7QUFDSCxFQUFDO0FBRUQsZUFBZSxDQUFBLE9BQU9lO0lBQ3BCLE1BQU1DLFlBQVlELE1BQU1ILE9BQU8sQ0FBQ0ssZUFBZSxDQUFDLEVBQUUsQ0FBQ1osS0FBSyxDQUFDYSxPQUFPLENBQUMsV0FBVztJQUM1RSxNQUFNVixXQUFXTyxNQUFNSCxPQUFPLENBQUNLLGVBQWUsQ0FBQyxFQUFFLENBQUNaLEtBQUs7SUFDdkQsTUFBTUgsT0FBT2lCLE9BQU9KLE1BQU1ILE9BQU8sQ0FBQ0ssZUFBZSxDQUFDLEVBQUUsQ0FBQ1osS0FBSztJQUUxRCxNQUFNZSxPQUFzQjtRQUMxQkosV0FBV0E7UUFDWFIsVUFBVUE7UUFDVmEsV0FBVztRQUNYQyxRQUFRZDtRQUNSZSxVQUFVckI7SUFDWjtJQUVBLE1BQU1zQixVQUFVMUIsdUJBQXVCc0IsTUFBTUw7SUFDN0MsSUFBSVMsU0FBUztRQUNYLE9BQU87WUFBRUMsU0FBUyxDQUFDLDZCQUE2QixFQUFFakIsU0FBUyxRQUFRLENBQUM7WUFBRWtCLFdBQVc7UUFBSztJQUN4RixPQUFPO1FBQ0wsT0FBTztZQUFFRCxTQUFTLENBQUMsNkNBQTZDLEVBQUVqQixTQUFTLENBQUM7WUFBRWtCLFdBQVc7UUFBSztJQUNoRztBQUNGLENBQUEsRUFBQyJ9