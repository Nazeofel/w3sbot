import { ActivityType } from "discord.js";
const generateActivities = ()=>{
    const activityArray = [];
    for(const key in ActivityType){
        if (isNaN(Number(key))) {
            activityArray.push({
                name: key,
                value: ActivityType[key]
            });
        }
    }
    return activityArray;
};
export const config = {
    description: 'Set bot activity',
    options: [
        {
            name: 'activity',
            description: 'Activity',
            type: 'number',
            required: true,
            choices: generateActivities()
        },
        {
            name: 'text',
            description: 'Add some custom text',
            type: 'string',
            required: false
        }
    ]
};
export default (async (interaction)=>{
    const activity = interaction.options.getNumber('activity');
    const text = interaction.options.getString('text');
    interaction.client.user.setPresence({
        activities: [
            {
                name: text ? text : '🤩',
                type: activity
            }
        ]
    });
    return {
        content: `Bot activity set`,
        ephemeral: true
    };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcY29tbWFuZHNcXHNldGJvdGFjdGl2aXR5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHR5cGUgQ29tbWFuZENvbmZpZyB9IGZyb20gJ3JvYm8uanMnO1xyXG5pbXBvcnQgeyBDaGF0SW5wdXRDb21tYW5kSW50ZXJhY3Rpb24sIEFjdGl2aXR5VHlwZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxuY29uc3QgZ2VuZXJhdGVBY3Rpdml0aWVzID0gKCk6ICh7bmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyfSlbXSA9PiB7XHJcbiAgY29uc3QgYWN0aXZpdHlBcnJheSA9IFtdO1xyXG5cclxuICBmb3IgKGNvbnN0IGtleSBpbiBBY3Rpdml0eVR5cGUpIHtcclxuICAgIGlmIChpc05hTihOdW1iZXIoa2V5KSkpIHtcclxuICAgICAgYWN0aXZpdHlBcnJheS5wdXNoKHsgbmFtZToga2V5LCB2YWx1ZTogQWN0aXZpdHlUeXBlW2tleV0gfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYWN0aXZpdHlBcnJheTsgXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjb25maWc6IENvbW1hbmRDb25maWcgPSB7XHJcbiAgZGVzY3JpcHRpb246ICdTZXQgYm90IGFjdGl2aXR5JyxcclxuICBvcHRpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdhY3Rpdml0eScsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnQWN0aXZpdHknLFxyXG4gICAgICB0eXBlOiAnbnVtYmVyJyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIGNob2ljZXM6IGdlbmVyYXRlQWN0aXZpdGllcygpXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAndGV4dCcsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnQWRkIHNvbWUgY3VzdG9tIHRleHQnLFxyXG4gICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgcmVxdWlyZWQ6IGZhbHNlXHJcbiAgICB9XHJcbiAgXVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoaW50ZXJhY3Rpb246IENoYXRJbnB1dENvbW1hbmRJbnRlcmFjdGlvbikgPT4ge1xyXG4gIGNvbnN0IGFjdGl2aXR5ID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXROdW1iZXIoJ2FjdGl2aXR5Jyk7XHJcbiAgY29uc3QgdGV4dCA9IGludGVyYWN0aW9uLm9wdGlvbnMuZ2V0U3RyaW5nKCd0ZXh0Jyk7XHJcblxyXG4gIGludGVyYWN0aW9uLmNsaWVudC51c2VyLnNldFByZXNlbmNlKHtcclxuICAgIGFjdGl2aXRpZXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6IHRleHQgPyB0ZXh0IDogJ/CfpKknLFxyXG4gICAgICAgIHR5cGU6IGFjdGl2aXR5XHJcbiAgICAgIH0sXHJcbiAgICBdXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjb250ZW50OiBgQm90IGFjdGl2aXR5IHNldGAsIFxyXG4gICAgZXBoZW1lcmFsOiB0cnVlXHJcbiAgfTtcclxufSJdLCJuYW1lcyI6WyJBY3Rpdml0eVR5cGUiLCJnZW5lcmF0ZUFjdGl2aXRpZXMiLCJhY3Rpdml0eUFycmF5Iiwia2V5IiwiaXNOYU4iLCJOdW1iZXIiLCJwdXNoIiwibmFtZSIsInZhbHVlIiwiY29uZmlnIiwiZGVzY3JpcHRpb24iLCJvcHRpb25zIiwidHlwZSIsInJlcXVpcmVkIiwiY2hvaWNlcyIsImludGVyYWN0aW9uIiwiYWN0aXZpdHkiLCJnZXROdW1iZXIiLCJ0ZXh0IiwiZ2V0U3RyaW5nIiwiY2xpZW50IiwidXNlciIsInNldFByZXNlbmNlIiwiYWN0aXZpdGllcyIsImNvbnRlbnQiLCJlcGhlbWVyYWwiXSwibWFwcGluZ3MiOiJBQUNBLFNBQXNDQSxZQUFZLFFBQVEsYUFBYTtBQUV2RSxNQUFNQyxxQkFBcUI7SUFDekIsTUFBTUMsZ0JBQWdCLEVBQUU7SUFFeEIsSUFBSyxNQUFNQyxPQUFPSCxhQUFjO1FBQzlCLElBQUlJLE1BQU1DLE9BQU9GLE9BQU87WUFDdEJELGNBQWNJLElBQUksQ0FBQztnQkFBRUMsTUFBTUo7Z0JBQUtLLE9BQU9SLFlBQVksQ0FBQ0csSUFBSTtZQUFDO1FBQzNEO0lBQ0Y7SUFFQSxPQUFPRDtBQUNUO0FBRUEsT0FBTyxNQUFNTyxTQUF3QjtJQUNuQ0MsYUFBYTtJQUNiQyxTQUFTO1FBQ1A7WUFDRUosTUFBTTtZQUNORyxhQUFhO1lBQ2JFLE1BQU07WUFDTkMsVUFBVTtZQUNWQyxTQUFTYjtRQUNYO1FBQ0E7WUFDRU0sTUFBTTtZQUNORyxhQUFhO1lBQ2JFLE1BQU07WUFDTkMsVUFBVTtRQUNaO0tBQ0Q7QUFDSCxFQUFDO0FBRUQsZUFBZSxDQUFBLE9BQU9FO0lBQ3BCLE1BQU1DLFdBQVdELFlBQVlKLE9BQU8sQ0FBQ00sU0FBUyxDQUFDO0lBQy9DLE1BQU1DLE9BQU9ILFlBQVlKLE9BQU8sQ0FBQ1EsU0FBUyxDQUFDO0lBRTNDSixZQUFZSyxNQUFNLENBQUNDLElBQUksQ0FBQ0MsV0FBVyxDQUFDO1FBQ2xDQyxZQUFZO1lBQ1Y7Z0JBQ0VoQixNQUFNVyxPQUFPQSxPQUFPO2dCQUNwQk4sTUFBTUk7WUFDUjtTQUNEO0lBQ0g7SUFFQSxPQUFPO1FBQ0xRLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUMzQkMsV0FBVztJQUNiO0FBQ0YsQ0FBQSxFQUFDIn0=