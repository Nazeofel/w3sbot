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
