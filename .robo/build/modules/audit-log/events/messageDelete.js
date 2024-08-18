import { AttachmentBuilder } from "discord.js";
import messageUtil from "./utilities/message-template.js";
import { Flashcore } from "robo.js";
export default (async (message)=>{
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
            const messageTemplate = messageUtil.generateEmbedMessage(message, 'deleted', message.attachments.size, null);
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
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcbW9kdWxlc1xcYXVkaXQtbG9nXFxldmVudHNcXG1lc3NhZ2VEZWxldGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSwgQXR0YWNobWVudEJ1aWxkZXIsIEF1ZGl0TG9nRXZlbnQgIH0gZnJvbSAnZGlzY29yZC5qcydcclxuaW1wb3J0IG1lc3NhZ2VVdGlsIGZyb20gJy4vdXRpbGl0aWVzL21lc3NhZ2UtdGVtcGxhdGUuanMnO1xyXG5pbXBvcnQgeyBGbGFzaGNvcmUgfSBmcm9tICdyb2JvLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XHJcbiAgY29uc3QgYXR0YWNobWVudHNBcnJheSA9IFtdO1xyXG4gIGlmKG1lc3NhZ2UuYXR0YWNobWVudHMuc2l6ZSA+IDApIHtcclxuICAgIG1lc3NhZ2UuYXR0YWNobWVudHMubWFwKGF0dGFjaG1lbnQgPT4ge1xyXG4gICAgICBjb25zdCBhdHQgPSBuZXcgQXR0YWNobWVudEJ1aWxkZXIoYXR0YWNobWVudC51cmwpXHJcbiAgICAgIGF0dGFjaG1lbnRzQXJyYXkucHVzaChhdHQpO1xyXG4gICAgfSlcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coJ05vIGF0dGFjaG1lbnRzJylcclxuICB9XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGF1ZGl0TG9nQ2hhbm5lbERhdGEgPSBKU09OLnBhcnNlKGF3YWl0IEZsYXNoY29yZS5nZXQoJ2F1ZGl0LWxvZy1jaGFubmVsJywge1xyXG4gICAgICBuYW1lc3BhY2U6IG1lc3NhZ2UuZ3VpbGRJZCFcclxuICAgIH0pKTtcclxuICAgIGlmIChhdWRpdExvZ0NoYW5uZWxEYXRhKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2VUZW1wbGF0ZSA9IG1lc3NhZ2VVdGlsLmdlbmVyYXRlRW1iZWRNZXNzYWdlKG1lc3NhZ2UsICdkZWxldGVkJywgbWVzc2FnZS5hdHRhY2htZW50cy5zaXplLCBudWxsKTtcclxuICAgICAgY29uc3QgYXVkaXRDaGFubmVsID0gbWVzc2FnZS5ndWlsZC5jaGFubmVscy5jYWNoZS5nZXQoYXVkaXRMb2dDaGFubmVsRGF0YS5jaGFubmVsSWQpO1xyXG4gICAgICBpZighYXVkaXRDaGFubmVsKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgQ2hhbm5lbCB3aXRoIGlkICR7YXVkaXRMb2dDaGFubmVsRGF0YS5jaGFubmVsSWR9IG5vdCBmb3VuZGApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYoYXVkaXRDaGFubmVsLmlzVGV4dEJhc2VkKCkpIHtcclxuICAgICAgICBhd2FpdCBhdWRpdENoYW5uZWwuc2VuZCh7ZW1iZWRzOiBbbWVzc2FnZVRlbXBsYXRlXSwgZmlsZXM6IGF0dGFjaG1lbnRzQXJyYXl9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiQXR0YWNobWVudEJ1aWxkZXIiLCJtZXNzYWdlVXRpbCIsIkZsYXNoY29yZSIsIm1lc3NhZ2UiLCJhdHRhY2htZW50c0FycmF5IiwiYXR0YWNobWVudHMiLCJzaXplIiwibWFwIiwiYXR0YWNobWVudCIsImF0dCIsInVybCIsInB1c2giLCJjb25zb2xlIiwibG9nIiwiYXVkaXRMb2dDaGFubmVsRGF0YSIsIkpTT04iLCJwYXJzZSIsImdldCIsIm5hbWVzcGFjZSIsImd1aWxkSWQiLCJtZXNzYWdlVGVtcGxhdGUiLCJnZW5lcmF0ZUVtYmVkTWVzc2FnZSIsImF1ZGl0Q2hhbm5lbCIsImd1aWxkIiwiY2hhbm5lbHMiLCJjYWNoZSIsImNoYW5uZWxJZCIsImVycm9yIiwiaXNUZXh0QmFzZWQiLCJzZW5kIiwiZW1iZWRzIiwiZmlsZXMiXSwibWFwcGluZ3MiOiJBQUFBLFNBQWtCQSxpQkFBaUIsUUFBd0IsYUFBWTtBQUN2RSxPQUFPQyxpQkFBaUIsa0NBQWtDO0FBQzFELFNBQVNDLFNBQVMsUUFBUSxVQUFVO0FBRXBDLGVBQWUsQ0FBQSxPQUFPQztJQUNwQixNQUFNQyxtQkFBbUIsRUFBRTtJQUMzQixJQUFHRCxRQUFRRSxXQUFXLENBQUNDLElBQUksR0FBRyxHQUFHO1FBQy9CSCxRQUFRRSxXQUFXLENBQUNFLEdBQUcsQ0FBQ0MsQ0FBQUE7WUFDdEIsTUFBTUMsTUFBTSxJQUFJVCxrQkFBa0JRLFdBQVdFLEdBQUc7WUFDaEROLGlCQUFpQk8sSUFBSSxDQUFDRjtRQUN4QjtJQUNGLE9BQU87UUFDTEcsUUFBUUMsR0FBRyxDQUFDO0lBQ2Q7SUFDQSxJQUFJO1FBQ0YsTUFBTUMsc0JBQXNCQyxLQUFLQyxLQUFLLENBQUMsTUFBTWQsVUFBVWUsR0FBRyxDQUFDLHFCQUFxQjtZQUM5RUMsV0FBV2YsUUFBUWdCLE9BQU87UUFDNUI7UUFDQSxJQUFJTCxxQkFBcUI7WUFDdkIsTUFBTU0sa0JBQWtCbkIsWUFBWW9CLG9CQUFvQixDQUFDbEIsU0FBUyxXQUFXQSxRQUFRRSxXQUFXLENBQUNDLElBQUksRUFBRTtZQUN2RyxNQUFNZ0IsZUFBZW5CLFFBQVFvQixLQUFLLENBQUNDLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDUixHQUFHLENBQUNILG9CQUFvQlksU0FBUztZQUNuRixJQUFHLENBQUNKLGNBQWM7Z0JBQ2hCVixRQUFRZSxLQUFLLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRWIsb0JBQW9CWSxTQUFTLENBQUMsVUFBVSxDQUFDO2dCQUMxRTtZQUNGO1lBRUEsSUFBR0osYUFBYU0sV0FBVyxJQUFJO2dCQUM3QixNQUFNTixhQUFhTyxJQUFJLENBQUM7b0JBQUNDLFFBQVE7d0JBQUNWO3FCQUFnQjtvQkFBRVcsT0FBTzNCO2dCQUFnQjtZQUM3RTtRQUNGO0lBQ0YsRUFBRSxPQUFPdUIsT0FBTztRQUNkZixRQUFRQyxHQUFHLENBQUNjO0lBQ2Q7QUFDRixDQUFBLEVBQUMifQ==