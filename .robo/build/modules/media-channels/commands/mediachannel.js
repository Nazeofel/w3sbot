import "dotenv/config";
import { Flashcore } from "@roboplay/robo.js";
export const config = {
    description: 'Sets a channel as media only channel',
    options: [
        {
            name: 'channel',
            required: true,
            description: 'Choose a channel'
        }
    ]
};
export default (async (interaction)=>{
    const channelId = interaction.options._hoistedOptions[0].value.match(/\d+/)[0];
    const channelName = interaction.guild.channels.cache.get(channelId).name;
    try {
        await Flashcore.set('media-channel', JSON.stringify({
            channelName: channelName,
            channelId: channelId
        }), {
            namespace: interaction.guildId
        });
        const mediaChannel = interaction.member.guild.channels.cache.get(channelId);
        mediaChannel.permissionOverwrites.create(interaction.guild.roles.everyone, {
            VIEW_CHANNEL: 1,
            SEND_MESSAGES: 0,
            ATTACH_FILES: 1
        }).then(()=>console.log('Permissions set successfully for @everyone!')).catch(console.error);
        return `Media-only channel set - <#${channelId}>`;
    } catch (e) {
        console.error(e);
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxtZWRpYS1jaGFubmVsc1xcY29tbWFuZHNcXG1lZGlhY2hhbm5lbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2RvdGVudi9jb25maWcnXHJcbmltcG9ydCB7IEZsYXNoY29yZSwgdHlwZSBDb21tYW5kQ29uZmlnIH0gZnJvbSAnQHJvYm9wbGF5L3JvYm8uanMnXHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnOiBDb21tYW5kQ29uZmlnID0ge1xyXG4gIGRlc2NyaXB0aW9uOiAnU2V0cyBhIGNoYW5uZWwgYXMgbWVkaWEgb25seSBjaGFubmVsJyxcclxuICBvcHRpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdjaGFubmVsJyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ2hvb3NlIGEgY2hhbm5lbCdcclxuICAgIH1cclxuICBdXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChpbnRlcmFjdGlvbikgPT4ge1xyXG4gIGNvbnN0IGNoYW5uZWxJZCA9IGludGVyYWN0aW9uLm9wdGlvbnMuX2hvaXN0ZWRPcHRpb25zWzBdLnZhbHVlLm1hdGNoKC9cXGQrLylbMF07XHJcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBpbnRlcmFjdGlvbi5ndWlsZC5jaGFubmVscy5jYWNoZS5nZXQoY2hhbm5lbElkKS5uYW1lO1xyXG5cclxuXHR0cnkge1xyXG4gICAgYXdhaXQgRmxhc2hjb3JlLnNldCgnbWVkaWEtY2hhbm5lbCcsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgY2hhbm5lbE5hbWU6IGNoYW5uZWxOYW1lLFxyXG4gICAgICBjaGFubmVsSWQ6IGNoYW5uZWxJZFxyXG4gICAgfSksIHtcclxuICAgICAgbmFtZXNwYWNlOiBpbnRlcmFjdGlvbi5ndWlsZElkIVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgbWVkaWFDaGFubmVsID0gaW50ZXJhY3Rpb24ubWVtYmVyLmd1aWxkLmNoYW5uZWxzLmNhY2hlLmdldChjaGFubmVsSWQpOyAgICAgIFxyXG4gICAgbWVkaWFDaGFubmVsLnBlcm1pc3Npb25PdmVyd3JpdGVzLmNyZWF0ZShpbnRlcmFjdGlvbi5ndWlsZC5yb2xlcy5ldmVyeW9uZSwge1xyXG4gICAgICBWSUVXX0NIQU5ORUw6IDEsXHJcbiAgICAgIFNFTkRfTUVTU0FHRVM6IDAsXHJcbiAgICAgIEFUVEFDSF9GSUxFUzogMVxyXG4gICAgfSlcclxuICAgIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKCdQZXJtaXNzaW9ucyBzZXQgc3VjY2Vzc2Z1bGx5IGZvciBAZXZlcnlvbmUhJykpXHJcbiAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XHJcbiAgICByZXR1cm4gYE1lZGlhLW9ubHkgY2hhbm5lbCBzZXQgLSA8IyR7Y2hhbm5lbElkfT5gICAgIFxyXG5cclxuXHR9IGNhdGNoKGUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZSlcclxuICB9XHJcbn0iXSwibmFtZXMiOlsiRmxhc2hjb3JlIiwiY29uZmlnIiwiZGVzY3JpcHRpb24iLCJvcHRpb25zIiwibmFtZSIsInJlcXVpcmVkIiwiaW50ZXJhY3Rpb24iLCJjaGFubmVsSWQiLCJfaG9pc3RlZE9wdGlvbnMiLCJ2YWx1ZSIsIm1hdGNoIiwiY2hhbm5lbE5hbWUiLCJndWlsZCIsImNoYW5uZWxzIiwiY2FjaGUiLCJnZXQiLCJzZXQiLCJKU09OIiwic3RyaW5naWZ5IiwibmFtZXNwYWNlIiwiZ3VpbGRJZCIsIm1lZGlhQ2hhbm5lbCIsIm1lbWJlciIsInBlcm1pc3Npb25PdmVyd3JpdGVzIiwiY3JlYXRlIiwicm9sZXMiLCJldmVyeW9uZSIsIlZJRVdfQ0hBTk5FTCIsIlNFTkRfTUVTU0FHRVMiLCJBVFRBQ0hfRklMRVMiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZXJyb3IiLCJlIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGdCQUFlO0FBQ3RCLFNBQVNBLFNBQVMsUUFBNEIsb0JBQW1CO0FBRWpFLE9BQU8sTUFBTUMsU0FBd0I7SUFDbkNDLGFBQWE7SUFDYkMsU0FBUztRQUNQO1lBQ0VDLE1BQU07WUFDTkMsVUFBVTtZQUNWSCxhQUFhO1FBQ2Y7S0FDRDtBQUNILEVBQUM7QUFFRCxlQUFlLENBQUEsT0FBT0k7SUFDcEIsTUFBTUMsWUFBWUQsWUFBWUgsT0FBTyxDQUFDSyxlQUFlLENBQUMsRUFBRSxDQUFDQyxLQUFLLENBQUNDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtJQUM5RSxNQUFNQyxjQUFjTCxZQUFZTSxLQUFLLENBQUNDLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDQyxHQUFHLENBQUNSLFdBQVdILElBQUk7SUFFekUsSUFBSTtRQUNELE1BQU1KLFVBQVVnQixHQUFHLENBQUMsaUJBQWlCQyxLQUFLQyxTQUFTLENBQUM7WUFDbERQLGFBQWFBO1lBQ2JKLFdBQVdBO1FBQ2IsSUFBSTtZQUNGWSxXQUFXYixZQUFZYyxPQUFPO1FBQ2hDO1FBRUEsTUFBTUMsZUFBZWYsWUFBWWdCLE1BQU0sQ0FBQ1YsS0FBSyxDQUFDQyxRQUFRLENBQUNDLEtBQUssQ0FBQ0MsR0FBRyxDQUFDUjtRQUNqRWMsYUFBYUUsb0JBQW9CLENBQUNDLE1BQU0sQ0FBQ2xCLFlBQVlNLEtBQUssQ0FBQ2EsS0FBSyxDQUFDQyxRQUFRLEVBQUU7WUFDekVDLGNBQWM7WUFDZEMsZUFBZTtZQUNmQyxjQUFjO1FBQ2hCLEdBQ0NDLElBQUksQ0FBQyxJQUFNQyxRQUFRQyxHQUFHLENBQUMsZ0RBQ3ZCQyxLQUFLLENBQUNGLFFBQVFHLEtBQUs7UUFDcEIsT0FBTyxDQUFDLDJCQUEyQixFQUFFM0IsVUFBVSxDQUFDLENBQUM7SUFFcEQsRUFBRSxPQUFNNEIsR0FBRztRQUNSSixRQUFRRyxLQUFLLENBQUNDO0lBQ2hCO0FBQ0YsQ0FBQSxFQUFDIn0=