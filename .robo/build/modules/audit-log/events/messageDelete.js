import { AttachmentBuilder } from "discord.js";
import messageUtil from "./utilities/message-template.js";
import { Flashcore } from "@roboplay/robo.js";
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
        const auditLogChannelData = await Flashcore.get('media-channel', {
            namespace: message.guildId
        });
        if (auditLogChannelData) {
            const parsed = JSON.parse(auditLogChannelData);
            const messageTemplate = messageUtil.generateEmbedMessage(message, 'deleted', message.attachments.size, null);
            const auditChannel = message.guild.channels.cache.get(parsed.channelId);
            if (!auditChannel) {
                console.error(`Channel with id ${parsed.channelId} not found`);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxhdWRpdC1sb2dcXGV2ZW50c1xcbWVzc2FnZURlbGV0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlLCBBdHRhY2htZW50QnVpbGRlciwgQXVkaXRMb2dFdmVudCAgfSBmcm9tICdkaXNjb3JkLmpzJ1xyXG5pbXBvcnQgbWVzc2FnZVV0aWwgZnJvbSAnLi91dGlsaXRpZXMvbWVzc2FnZS10ZW1wbGF0ZS5qcyc7XHJcbmltcG9ydCB7IEZsYXNoY29yZSB9IGZyb20gJ0Byb2JvcGxheS9yb2JvLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XHJcbiAgY29uc3QgYXR0YWNobWVudHNBcnJheSA9IFtdO1xyXG4gIGlmKG1lc3NhZ2UuYXR0YWNobWVudHMuc2l6ZSA+IDApIHtcclxuICAgIG1lc3NhZ2UuYXR0YWNobWVudHMubWFwKGF0dGFjaG1lbnQgPT4ge1xyXG4gICAgICBjb25zdCBhdHQgPSBuZXcgQXR0YWNobWVudEJ1aWxkZXIoYXR0YWNobWVudC51cmwpXHJcbiAgICAgIGF0dGFjaG1lbnRzQXJyYXkucHVzaChhdHQpO1xyXG4gICAgfSkgIFxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZygnTm8gYXR0YWNobWVudHMnKVxyXG4gIH1cclxuICB0cnkge1xyXG4gICAgY29uc3QgYXVkaXRMb2dDaGFubmVsRGF0YSA9IGF3YWl0IEZsYXNoY29yZS5nZXQoJ21lZGlhLWNoYW5uZWwnLCB7XHJcbiAgICAgIG5hbWVzcGFjZTogbWVzc2FnZS5ndWlsZElkIVxyXG4gICAgfSkgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGF1ZGl0TG9nQ2hhbm5lbERhdGEpIHtcclxuICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShhdWRpdExvZ0NoYW5uZWxEYXRhKTtcclxuICAgICAgY29uc3QgbWVzc2FnZVRlbXBsYXRlID0gbWVzc2FnZVV0aWwuZ2VuZXJhdGVFbWJlZE1lc3NhZ2UobWVzc2FnZSwgJ2RlbGV0ZWQnLCBtZXNzYWdlLmF0dGFjaG1lbnRzLnNpemUsIG51bGwpO1xyXG4gICAgICBjb25zdCBhdWRpdENoYW5uZWwgPSBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzLmNhY2hlLmdldChwYXJzZWQuY2hhbm5lbElkKTtcclxuICAgICAgaWYoIWF1ZGl0Q2hhbm5lbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYENoYW5uZWwgd2l0aCBpZCAke3BhcnNlZC5jaGFubmVsSWR9IG5vdCBmb3VuZGApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYoYXVkaXRDaGFubmVsLmlzVGV4dEJhc2VkKCkpIHtcclxuICAgICAgICBhd2FpdCBhdWRpdENoYW5uZWwuc2VuZCh7ZW1iZWRzOiBbbWVzc2FnZVRlbXBsYXRlXSwgZmlsZXM6IGF0dGFjaG1lbnRzQXJyYXl9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiQXR0YWNobWVudEJ1aWxkZXIiLCJtZXNzYWdlVXRpbCIsIkZsYXNoY29yZSIsIm1lc3NhZ2UiLCJhdHRhY2htZW50c0FycmF5IiwiYXR0YWNobWVudHMiLCJzaXplIiwibWFwIiwiYXR0YWNobWVudCIsImF0dCIsInVybCIsInB1c2giLCJjb25zb2xlIiwibG9nIiwiYXVkaXRMb2dDaGFubmVsRGF0YSIsImdldCIsIm5hbWVzcGFjZSIsImd1aWxkSWQiLCJwYXJzZWQiLCJKU09OIiwicGFyc2UiLCJtZXNzYWdlVGVtcGxhdGUiLCJnZW5lcmF0ZUVtYmVkTWVzc2FnZSIsImF1ZGl0Q2hhbm5lbCIsImd1aWxkIiwiY2hhbm5lbHMiLCJjYWNoZSIsImNoYW5uZWxJZCIsImVycm9yIiwiaXNUZXh0QmFzZWQiLCJzZW5kIiwiZW1iZWRzIiwiZmlsZXMiXSwibWFwcGluZ3MiOiJBQUFBLFNBQWtCQSxpQkFBaUIsUUFBd0IsYUFBWTtBQUN2RSxPQUFPQyxpQkFBaUIsa0NBQWtDO0FBQzFELFNBQVNDLFNBQVMsUUFBUSxvQkFBb0I7QUFFOUMsZUFBZSxDQUFBLE9BQU9DO0lBQ3BCLE1BQU1DLG1CQUFtQixFQUFFO0lBQzNCLElBQUdELFFBQVFFLFdBQVcsQ0FBQ0MsSUFBSSxHQUFHLEdBQUc7UUFDL0JILFFBQVFFLFdBQVcsQ0FBQ0UsR0FBRyxDQUFDQyxDQUFBQTtZQUN0QixNQUFNQyxNQUFNLElBQUlULGtCQUFrQlEsV0FBV0UsR0FBRztZQUNoRE4saUJBQWlCTyxJQUFJLENBQUNGO1FBQ3hCO0lBQ0YsT0FBTztRQUNMRyxRQUFRQyxHQUFHLENBQUM7SUFDZDtJQUNBLElBQUk7UUFDRixNQUFNQyxzQkFBc0IsTUFBTVosVUFBVWEsR0FBRyxDQUFDLGlCQUFpQjtZQUMvREMsV0FBV2IsUUFBUWMsT0FBTztRQUM1QjtRQUNBLElBQUlILHFCQUFxQjtZQUN2QixNQUFNSSxTQUFTQyxLQUFLQyxLQUFLLENBQUNOO1lBQzFCLE1BQU1PLGtCQUFrQnBCLFlBQVlxQixvQkFBb0IsQ0FBQ25CLFNBQVMsV0FBV0EsUUFBUUUsV0FBVyxDQUFDQyxJQUFJLEVBQUU7WUFDdkcsTUFBTWlCLGVBQWVwQixRQUFRcUIsS0FBSyxDQUFDQyxRQUFRLENBQUNDLEtBQUssQ0FBQ1gsR0FBRyxDQUFDRyxPQUFPUyxTQUFTO1lBQ3RFLElBQUcsQ0FBQ0osY0FBYztnQkFDaEJYLFFBQVFnQixLQUFLLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRVYsT0FBT1MsU0FBUyxDQUFDLFVBQVUsQ0FBQztnQkFDN0Q7WUFDRjtZQUVBLElBQUdKLGFBQWFNLFdBQVcsSUFBSTtnQkFDN0IsTUFBTU4sYUFBYU8sSUFBSSxDQUFDO29CQUFDQyxRQUFRO3dCQUFDVjtxQkFBZ0I7b0JBQUVXLE9BQU81QjtnQkFBZ0I7WUFDN0U7UUFDRjtJQUNGLEVBQUUsT0FBT3dCLE9BQU87UUFDZGhCLFFBQVFDLEdBQUcsQ0FBQ2U7SUFDZDtBQUNGLENBQUEsRUFBQyJ9