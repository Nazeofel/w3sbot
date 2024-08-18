import { AttachmentBuilder } from "discord.js";
import messageUtil from "./utilities/message-template.js";
import { Flashcore } from "robo.js";
export default (async (message)=>{
    if (!message.author.bot) {
        try {
            const attachmentsArray = [];
            if (message.attachments.size > 0) {
                message.attachments.map((attachment)=>{
                    const att = new AttachmentBuilder(attachment.url);
                    attachmentsArray.push(att);
                });
            } else {
                console.log('No attachments');
            }
            try {
                const auditLogChannelData = JSON.parse(await Flashcore.get('audit-log-channel', {
                    namespace: message.guildId
                }));
                if (auditLogChannelData) {
                    const messageTemplate = messageUtil.generateEmbedMessage(message, 'updated', message.attachments.size, null);
                    const auditChannel = message.guild.channels.cache.get(auditLogChannelData.channelId);
                    if (!auditChannel) {
                        console.error(`Channel with id ${auditLogChannelData.channelId} not found`);
                        return;
                    }
                    if (auditChannel.isTextBased()) {
                        await auditChannel.send({
                            embeds: [
                                messageTemplate
                            ],
                            files: attachmentsArray
                        });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcbW9kdWxlc1xcYXVkaXQtbG9nXFxldmVudHNcXG1lc3NhZ2VVcGRhdGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSwgQXR0YWNobWVudEJ1aWxkZXIgfSBmcm9tICdkaXNjb3JkLmpzJ1xyXG5pbXBvcnQgbWVzc2FnZVV0aWwgZnJvbSAnLi91dGlsaXRpZXMvbWVzc2FnZS10ZW1wbGF0ZS5qcyc7XHJcbmltcG9ydCB7IEZsYXNoY29yZSB9IGZyb20gJ3JvYm8uanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcclxuICBpZighbWVzc2FnZS5hdXRob3IuYm90KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBhdHRhY2htZW50c0FycmF5ID0gW107XHJcbiAgICAgIGlmKG1lc3NhZ2UuYXR0YWNobWVudHMuc2l6ZSA+IDApIHtcclxuICAgICAgICBtZXNzYWdlLmF0dGFjaG1lbnRzLm1hcChhdHRhY2htZW50ID0+IHtcclxuICAgICAgICAgIGNvbnN0IGF0dCA9IG5ldyBBdHRhY2htZW50QnVpbGRlcihhdHRhY2htZW50LnVybClcclxuICAgICAgICAgIGF0dGFjaG1lbnRzQXJyYXkucHVzaChhdHQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ05vIGF0dGFjaG1lbnRzJylcclxuICAgICAgfVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGF1ZGl0TG9nQ2hhbm5lbERhdGEgPSBKU09OLnBhcnNlKGF3YWl0IEZsYXNoY29yZS5nZXQoJ2F1ZGl0LWxvZy1jaGFubmVsJywge1xyXG4gICAgICAgICAgbmFtZXNwYWNlOiBtZXNzYWdlLmd1aWxkSWQhXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGlmIChhdWRpdExvZ0NoYW5uZWxEYXRhKSB7XHJcbiAgICAgICAgICBjb25zdCBtZXNzYWdlVGVtcGxhdGUgPSBtZXNzYWdlVXRpbC5nZW5lcmF0ZUVtYmVkTWVzc2FnZShtZXNzYWdlLCAndXBkYXRlZCcsIG1lc3NhZ2UuYXR0YWNobWVudHMuc2l6ZSwgbnVsbCk7XHJcbiAgICAgICAgICBjb25zdCBhdWRpdENoYW5uZWwgPSBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzLmNhY2hlLmdldChhdWRpdExvZ0NoYW5uZWxEYXRhLmNoYW5uZWxJZCk7XHJcblxyXG4gICAgICAgICAgaWYoIWF1ZGl0Q2hhbm5lbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBDaGFubmVsIHdpdGggaWQgJHthdWRpdExvZ0NoYW5uZWxEYXRhLmNoYW5uZWxJZH0gbm90IGZvdW5kYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZihhdWRpdENoYW5uZWwuaXNUZXh0QmFzZWQoKSkge1xyXG4gICAgICAgICAgICBhd2FpdCBhdWRpdENoYW5uZWwuc2VuZCh7ZW1iZWRzOiBbbWVzc2FnZVRlbXBsYXRlXSwgZmlsZXM6IGF0dGFjaG1lbnRzQXJyYXl9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkF0dGFjaG1lbnRCdWlsZGVyIiwibWVzc2FnZVV0aWwiLCJGbGFzaGNvcmUiLCJtZXNzYWdlIiwiYXV0aG9yIiwiYm90IiwiYXR0YWNobWVudHNBcnJheSIsImF0dGFjaG1lbnRzIiwic2l6ZSIsIm1hcCIsImF0dGFjaG1lbnQiLCJhdHQiLCJ1cmwiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsImF1ZGl0TG9nQ2hhbm5lbERhdGEiLCJKU09OIiwicGFyc2UiLCJnZXQiLCJuYW1lc3BhY2UiLCJndWlsZElkIiwibWVzc2FnZVRlbXBsYXRlIiwiZ2VuZXJhdGVFbWJlZE1lc3NhZ2UiLCJhdWRpdENoYW5uZWwiLCJndWlsZCIsImNoYW5uZWxzIiwiY2FjaGUiLCJjaGFubmVsSWQiLCJlcnJvciIsImlzVGV4dEJhc2VkIiwic2VuZCIsImVtYmVkcyIsImZpbGVzIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFrQkEsaUJBQWlCLFFBQVEsYUFBWTtBQUN2RCxPQUFPQyxpQkFBaUIsa0NBQWtDO0FBQzFELFNBQVNDLFNBQVMsUUFBUSxVQUFVO0FBRXBDLGVBQWUsQ0FBQSxPQUFPQztJQUNwQixJQUFHLENBQUNBLFFBQVFDLE1BQU0sQ0FBQ0MsR0FBRyxFQUFFO1FBQ3RCLElBQUk7WUFDRixNQUFNQyxtQkFBbUIsRUFBRTtZQUMzQixJQUFHSCxRQUFRSSxXQUFXLENBQUNDLElBQUksR0FBRyxHQUFHO2dCQUMvQkwsUUFBUUksV0FBVyxDQUFDRSxHQUFHLENBQUNDLENBQUFBO29CQUN0QixNQUFNQyxNQUFNLElBQUlYLGtCQUFrQlUsV0FBV0UsR0FBRztvQkFDaEROLGlCQUFpQk8sSUFBSSxDQUFDRjtnQkFDeEI7WUFDRixPQUFPO2dCQUNMRyxRQUFRQyxHQUFHLENBQUM7WUFDZDtZQUNBLElBQUk7Z0JBQ0YsTUFBTUMsc0JBQXNCQyxLQUFLQyxLQUFLLENBQUMsTUFBTWhCLFVBQVVpQixHQUFHLENBQUMscUJBQXFCO29CQUM5RUMsV0FBV2pCLFFBQVFrQixPQUFPO2dCQUM1QjtnQkFDQSxJQUFJTCxxQkFBcUI7b0JBQ3ZCLE1BQU1NLGtCQUFrQnJCLFlBQVlzQixvQkFBb0IsQ0FBQ3BCLFNBQVMsV0FBV0EsUUFBUUksV0FBVyxDQUFDQyxJQUFJLEVBQUU7b0JBQ3ZHLE1BQU1nQixlQUFlckIsUUFBUXNCLEtBQUssQ0FBQ0MsUUFBUSxDQUFDQyxLQUFLLENBQUNSLEdBQUcsQ0FBQ0gsb0JBQW9CWSxTQUFTO29CQUVuRixJQUFHLENBQUNKLGNBQWM7d0JBQ2hCVixRQUFRZSxLQUFLLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRWIsb0JBQW9CWSxTQUFTLENBQUMsVUFBVSxDQUFDO3dCQUMxRTtvQkFDRjtvQkFFQSxJQUFHSixhQUFhTSxXQUFXLElBQUk7d0JBQzdCLE1BQU1OLGFBQWFPLElBQUksQ0FBQzs0QkFBQ0MsUUFBUTtnQ0FBQ1Y7NkJBQWdCOzRCQUFFVyxPQUFPM0I7d0JBQWdCO29CQUM3RTtnQkFDRjtZQUNGLEVBQUUsT0FBT3VCLE9BQU87Z0JBQ2RmLFFBQVFDLEdBQUcsQ0FBQ2M7WUFDZDtRQUNGLEVBQUUsT0FBT0EsT0FBTztZQUNaZixRQUFRQyxHQUFHLENBQUNjO1FBQ2hCO0lBQ0Y7QUFDRixDQUFBLEVBQUMifQ==