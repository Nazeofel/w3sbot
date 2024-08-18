import "dotenv/config";
import { Flashcore } from "robo.js";
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
    console.log(channelId, channelName);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcbW9kdWxlc1xcYXVkaXQtbG9nXFxjb21tYW5kc1xcYXVkaXRsb2djaGFubmVsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnZG90ZW52L2NvbmZpZydcclxuaW1wb3J0IHsgRmxhc2hjb3JlLCB0eXBlIENvbW1hbmRDb25maWcgfSBmcm9tICdyb2JvLmpzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZzogQ29tbWFuZENvbmZpZyA9IHtcclxuICBkZXNjcmlwdGlvbjogJ1NldHMgYSBjaGFubmVsIGZvciBhdWRpdCBsb2dzJyxcclxuICBvcHRpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdjaGFubmVsJyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnU2V0IGEgY2hhbm5lbCB3aGVyZSBhdWRpdCBsb2dzIHdpbGwgYmUgc3RvcmVkJ1xyXG4gICAgfVxyXG4gIF1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGludGVyYWN0aW9uKSA9PiB7XHJcbiAgY29uc3QgY2hhbm5lbElkID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5faG9pc3RlZE9wdGlvbnNbMF0udmFsdWUubWF0Y2goL1xcZCsvKVswXTtcclxuICBjb25zdCBjaGFubmVsTmFtZSA9IGludGVyYWN0aW9uLmd1aWxkLmNoYW5uZWxzLmNhY2hlLmdldChjaGFubmVsSWQpLm5hbWU7XHJcbiAgY29uc29sZS5sb2coY2hhbm5lbElkLGNoYW5uZWxOYW1lKVxyXG5cclxuXHR0cnkge1xyXG4gICAgYXdhaXQgRmxhc2hjb3JlLnNldCgnYXVkaXQtbG9nLWNoYW5uZWwnLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIGNoYW5uZWxOYW1lOiBjaGFubmVsTmFtZSxcclxuICAgICAgY2hhbm5lbElkOiBjaGFubmVsSWRcclxuICAgIH0pLCB7XHJcbiAgICAgIG5hbWVzcGFjZTogaW50ZXJhY3Rpb24uZ3VpbGRJZFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGBBdWRpdCBsb2cgY2hhbm5lbCBzZXQgLSA8IyR7Y2hhbm5lbElkfT5gO1xyXG5cdH0gY2F0Y2goZSkge1xyXG4gICAgY29uc29sZS5lcnJvcihlKVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiRmxhc2hjb3JlIiwiY29uZmlnIiwiZGVzY3JpcHRpb24iLCJvcHRpb25zIiwibmFtZSIsInJlcXVpcmVkIiwiaW50ZXJhY3Rpb24iLCJjaGFubmVsSWQiLCJfaG9pc3RlZE9wdGlvbnMiLCJ2YWx1ZSIsIm1hdGNoIiwiY2hhbm5lbE5hbWUiLCJndWlsZCIsImNoYW5uZWxzIiwiY2FjaGUiLCJnZXQiLCJjb25zb2xlIiwibG9nIiwic2V0IiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWVzcGFjZSIsImd1aWxkSWQiLCJlIiwiZXJyb3IiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQWU7QUFDdEIsU0FBU0EsU0FBUyxRQUE0QixVQUFTO0FBRXZELE9BQU8sTUFBTUMsU0FBd0I7SUFDbkNDLGFBQWE7SUFDYkMsU0FBUztRQUNQO1lBQ0VDLE1BQU07WUFDTkMsVUFBVTtZQUNWSCxhQUFhO1FBQ2Y7S0FDRDtBQUNILEVBQUM7QUFFRCxlQUFlLENBQUEsT0FBT0k7SUFDcEIsTUFBTUMsWUFBWUQsWUFBWUgsT0FBTyxDQUFDSyxlQUFlLENBQUMsRUFBRSxDQUFDQyxLQUFLLENBQUNDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtJQUM5RSxNQUFNQyxjQUFjTCxZQUFZTSxLQUFLLENBQUNDLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDQyxHQUFHLENBQUNSLFdBQVdILElBQUk7SUFDeEVZLFFBQVFDLEdBQUcsQ0FBQ1YsV0FBVUk7SUFFdkIsSUFBSTtRQUNELE1BQU1YLFVBQVVrQixHQUFHLENBQUMscUJBQXFCQyxLQUFLQyxTQUFTLENBQUM7WUFDdERULGFBQWFBO1lBQ2JKLFdBQVdBO1FBQ2IsSUFBSTtZQUNGYyxXQUFXZixZQUFZZ0IsT0FBTztRQUNoQztRQUVBLE9BQU8sQ0FBQywwQkFBMEIsRUFBRWYsVUFBVSxDQUFDLENBQUM7SUFDbkQsRUFBRSxPQUFNZ0IsR0FBRztRQUNSUCxRQUFRUSxLQUFLLENBQUNEO0lBQ2hCO0FBQ0YsQ0FBQSxFQUFDIn0=