import "dotenv/config";
import { Flashcore } from "@roboplay/robo.js";
export const config = {
    description: 'Sets a channel for audit logs',
    options: [
        {
            name: 'channel',
            required: true,
            description: 'Set a channel where audit logs will be stored'
        }
    ]
};
export default (async (interaction)=>{
    const channelId = interaction.options._hoistedOptions[0].value.match(/\d+/)[0];
    const channelName = interaction.guild.channels.cache.get(channelId).name;
    try {
        await Flashcore.set('audit-log-channel', JSON.stringify({
            channelName: channelName,
            channelId: channelId
        }), {
            namespace: interaction.guildId
        });
        return `Audit log channel set - <#${channelId}>`;
    } catch (e) {
        console.error(e);
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxhdWRpdC1sb2dcXGNvbW1hbmRzXFxhdWRpdGxvZ2NoYW5uZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdkb3RlbnYvY29uZmlnJ1xyXG5pbXBvcnQgeyBGbGFzaGNvcmUsIHR5cGUgQ29tbWFuZENvbmZpZyB9IGZyb20gJ0Byb2JvcGxheS9yb2JvLmpzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZzogQ29tbWFuZENvbmZpZyA9IHtcclxuICBkZXNjcmlwdGlvbjogJ1NldHMgYSBjaGFubmVsIGZvciBhdWRpdCBsb2dzJyxcclxuICBvcHRpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdjaGFubmVsJyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnU2V0IGEgY2hhbm5lbCB3aGVyZSBhdWRpdCBsb2dzIHdpbGwgYmUgc3RvcmVkJ1xyXG4gICAgfVxyXG4gIF1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGludGVyYWN0aW9uKSA9PiB7XHJcbiAgY29uc3QgY2hhbm5lbElkID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5faG9pc3RlZE9wdGlvbnNbMF0udmFsdWUubWF0Y2goL1xcZCsvKVswXTtcclxuICBjb25zdCBjaGFubmVsTmFtZSA9IGludGVyYWN0aW9uLmd1aWxkLmNoYW5uZWxzLmNhY2hlLmdldChjaGFubmVsSWQpLm5hbWU7XHJcblxyXG5cdHRyeSB7XHJcbiAgICBhd2FpdCBGbGFzaGNvcmUuc2V0KCdhdWRpdC1sb2ctY2hhbm5lbCcsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgY2hhbm5lbE5hbWU6IGNoYW5uZWxOYW1lLFxyXG4gICAgICBjaGFubmVsSWQ6IGNoYW5uZWxJZFxyXG4gICAgfSksIHtcclxuICAgICAgbmFtZXNwYWNlOiBpbnRlcmFjdGlvbi5ndWlsZElkIVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGBBdWRpdCBsb2cgY2hhbm5lbCBzZXQgLSA8IyR7Y2hhbm5lbElkfT5gO1xyXG5cdH0gY2F0Y2goZSkge1xyXG4gICAgY29uc29sZS5lcnJvcihlKVxyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJGbGFzaGNvcmUiLCJjb25maWciLCJkZXNjcmlwdGlvbiIsIm9wdGlvbnMiLCJuYW1lIiwicmVxdWlyZWQiLCJpbnRlcmFjdGlvbiIsImNoYW5uZWxJZCIsIl9ob2lzdGVkT3B0aW9ucyIsInZhbHVlIiwibWF0Y2giLCJjaGFubmVsTmFtZSIsImd1aWxkIiwiY2hhbm5lbHMiLCJjYWNoZSIsImdldCIsInNldCIsIkpTT04iLCJzdHJpbmdpZnkiLCJuYW1lc3BhY2UiLCJndWlsZElkIiwiZSIsImNvbnNvbGUiLCJlcnJvciJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxnQkFBZTtBQUN0QixTQUFTQSxTQUFTLFFBQTRCLG9CQUFtQjtBQUVqRSxPQUFPLE1BQU1DLFNBQXdCO0lBQ25DQyxhQUFhO0lBQ2JDLFNBQVM7UUFDUDtZQUNFQyxNQUFNO1lBQ05DLFVBQVU7WUFDVkgsYUFBYTtRQUNmO0tBQ0Q7QUFDSCxFQUFDO0FBRUQsZUFBZSxDQUFBLE9BQU9JO0lBQ3BCLE1BQU1DLFlBQVlELFlBQVlILE9BQU8sQ0FBQ0ssZUFBZSxDQUFDLEVBQUUsQ0FBQ0MsS0FBSyxDQUFDQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFDOUUsTUFBTUMsY0FBY0wsWUFBWU0sS0FBSyxDQUFDQyxRQUFRLENBQUNDLEtBQUssQ0FBQ0MsR0FBRyxDQUFDUixXQUFXSCxJQUFJO0lBRXpFLElBQUk7UUFDRCxNQUFNSixVQUFVZ0IsR0FBRyxDQUFDLHFCQUFxQkMsS0FBS0MsU0FBUyxDQUFDO1lBQ3REUCxhQUFhQTtZQUNiSixXQUFXQTtRQUNiLElBQUk7WUFDRlksV0FBV2IsWUFBWWMsT0FBTztRQUNoQztRQUVBLE9BQU8sQ0FBQywwQkFBMEIsRUFBRWIsVUFBVSxDQUFDLENBQUM7SUFDbkQsRUFBRSxPQUFNYyxHQUFHO1FBQ1JDLFFBQVFDLEtBQUssQ0FBQ0Y7SUFDaEI7QUFDRixDQUFBLEVBQUMifQ==