import dbService from "../../../db/service/index.js";
import { allowedMediaTypes } from "../../../types/config.js";
export default (async (message)=>{
    const mediaChannelRequest = await dbService.getMediaChannel();
    if (mediaChannelRequest.data.channelId === message.channelId && mediaChannelRequest && mediaChannelRequest.code === 200 && mediaChannelRequest.data) {
        const mediaChannel = message.member.guild.channels.cache.get(mediaChannelRequest.data.channelId);
        try {
            if (mediaChannel.isTextBased() && !message.author.bot) {
                const fetchedMessage = await mediaChannel.messages.fetch(message.id);
                //895226128376160296 - prod role
                //1112030309588943016 - dev role
                if (message.member.roles.cache.has('895226128376160296')) {
                    return;
                }
                if (message.attachments.size > 0) {
                    console.log(message.attachments);
                    const files = Array.from(message.attachments.values()).filter((attachment)=>allowedMediaTypes.includes(attachment.contentType)).map((attachment)=>attachment.url);
                    await fetchedMessage.delete();
                    if (files && files.length > 0 || message.member.roles.cache.some) {
                        await mediaChannel.send({
                            content: `Posted by @${message.author.username}${message.author.discriminator !== '0' ? `#${message.author.discriminator}` : ''}`,
                            files: files
                        });
                    }
                } else {
                    await fetchedMessage.delete();
                }
            }
        } catch (error) {
            console.log('media-channels -> messageCreate.ts -> catch(error): ');
            console.log(error);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxtZWRpYS1jaGFubmVsc1xcZXZlbnRzXFxtZXNzYWdlQ3JlYXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJ1xyXG5pbXBvcnQgZGJTZXJ2aWNlIGZyb20gJy4uLy4uLy4uL2RiL3NlcnZpY2UvaW5kZXguanMnO1xyXG5pbXBvcnQge2FsbG93ZWRNZWRpYVR5cGVzfSBmcm9tICcuLi8uLi8uLi90eXBlcy9jb25maWcuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcclxuICBjb25zdCBtZWRpYUNoYW5uZWxSZXF1ZXN0ID0gYXdhaXQgZGJTZXJ2aWNlLmdldE1lZGlhQ2hhbm5lbCgpO1xyXG4gIGlmKG1lZGlhQ2hhbm5lbFJlcXVlc3QuZGF0YS5jaGFubmVsSWQgPT09IG1lc3NhZ2UuY2hhbm5lbElkICYmIG1lZGlhQ2hhbm5lbFJlcXVlc3QgJiYgXHJcbiAgICBtZWRpYUNoYW5uZWxSZXF1ZXN0LmNvZGUgPT09IDIwMCAmJiBcclxuICAgIG1lZGlhQ2hhbm5lbFJlcXVlc3QuZGF0YSkge1xyXG4gICAgICBjb25zdCBtZWRpYUNoYW5uZWwgPSBtZXNzYWdlLm1lbWJlci5ndWlsZC5jaGFubmVscy5jYWNoZS5nZXQobWVkaWFDaGFubmVsUmVxdWVzdC5kYXRhLmNoYW5uZWxJZCk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKG1lZGlhQ2hhbm5lbC5pc1RleHRCYXNlZCgpICYmICFtZXNzYWdlLmF1dGhvci5ib3QpIHtcclxuICAgICAgICAgIGNvbnN0IGZldGNoZWRNZXNzYWdlID0gYXdhaXQgbWVkaWFDaGFubmVsLm1lc3NhZ2VzLmZldGNoKG1lc3NhZ2UuaWQpO1xyXG4gICAgICAgICAgICAvLzg5NTIyNjEyODM3NjE2MDI5NiAtIHByb2Qgcm9sZVxyXG4gICAgICAgICAgICAvLzExMTIwMzAzMDk1ODg5NDMwMTYgLSBkZXYgcm9sZVxyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5tZW1iZXIucm9sZXMuY2FjaGUuaGFzKCc4OTUyMjYxMjgzNzYxNjAyOTYnKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKG1lc3NhZ2UuYXR0YWNobWVudHMuc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZS5hdHRhY2htZW50cylcclxuICAgICAgICAgICAgY29uc3QgZmlsZXMgPSBBcnJheS5mcm9tKG1lc3NhZ2UuYXR0YWNobWVudHMudmFsdWVzKCkpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGF0dGFjaG1lbnQpID0+IGFsbG93ZWRNZWRpYVR5cGVzLmluY2x1ZGVzKGF0dGFjaG1lbnQuY29udGVudFR5cGUpKVxyXG4gICAgICAgICAgICAubWFwKChhdHRhY2htZW50KSA9PiBhdHRhY2htZW50LnVybCk7XHJcbiAgICAgICAgICAgIGF3YWl0IGZldGNoZWRNZXNzYWdlLmRlbGV0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoZmlsZXMgJiYgZmlsZXMubGVuZ3RoID4gMCB8fCBtZXNzYWdlLm1lbWJlci5yb2xlcy5jYWNoZS5zb21lKSB7XHJcbiAgICAgICAgICAgICAgYXdhaXQgbWVkaWFDaGFubmVsLnNlbmQoe2NvbnRlbnQ6IGBQb3N0ZWQgYnkgQCR7bWVzc2FnZS5hdXRob3IudXNlcm5hbWV9JHttZXNzYWdlLmF1dGhvci5kaXNjcmltaW5hdG9yICE9PSAnMCcgPyBcclxuICAgICAgICAgICAgICBgIyR7bWVzc2FnZS5hdXRob3IuZGlzY3JpbWluYXRvcn1gIDogJyd9YCwgZmlsZXM6IGZpbGVzfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXdhaXQgZmV0Y2hlZE1lc3NhZ2UuZGVsZXRlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICBcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdtZWRpYS1jaGFubmVscyAtPiBtZXNzYWdlQ3JlYXRlLnRzIC0+IGNhdGNoKGVycm9yKTogJylcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9XHJcbiAgfVxyXG59Il0sIm5hbWVzIjpbImRiU2VydmljZSIsImFsbG93ZWRNZWRpYVR5cGVzIiwibWVzc2FnZSIsIm1lZGlhQ2hhbm5lbFJlcXVlc3QiLCJnZXRNZWRpYUNoYW5uZWwiLCJkYXRhIiwiY2hhbm5lbElkIiwiY29kZSIsIm1lZGlhQ2hhbm5lbCIsIm1lbWJlciIsImd1aWxkIiwiY2hhbm5lbHMiLCJjYWNoZSIsImdldCIsImlzVGV4dEJhc2VkIiwiYXV0aG9yIiwiYm90IiwiZmV0Y2hlZE1lc3NhZ2UiLCJtZXNzYWdlcyIsImZldGNoIiwiaWQiLCJyb2xlcyIsImhhcyIsImF0dGFjaG1lbnRzIiwic2l6ZSIsImNvbnNvbGUiLCJsb2ciLCJmaWxlcyIsIkFycmF5IiwiZnJvbSIsInZhbHVlcyIsImZpbHRlciIsImF0dGFjaG1lbnQiLCJpbmNsdWRlcyIsImNvbnRlbnRUeXBlIiwibWFwIiwidXJsIiwiZGVsZXRlIiwibGVuZ3RoIiwic29tZSIsInNlbmQiLCJjb250ZW50IiwidXNlcm5hbWUiLCJkaXNjcmltaW5hdG9yIiwiZXJyb3IiXSwibWFwcGluZ3MiOiJBQUNBLE9BQU9BLGVBQWUsK0JBQStCO0FBQ3JELFNBQVFDLGlCQUFpQixRQUFPLDJCQUEyQjtBQUUzRCxlQUFlLENBQUEsT0FBT0M7SUFDcEIsTUFBTUMsc0JBQXNCLE1BQU1ILFVBQVVJLGVBQWU7SUFDM0QsSUFBR0Qsb0JBQW9CRSxJQUFJLENBQUNDLFNBQVMsS0FBS0osUUFBUUksU0FBUyxJQUFJSCx1QkFDN0RBLG9CQUFvQkksSUFBSSxLQUFLLE9BQzdCSixvQkFBb0JFLElBQUksRUFBRTtRQUN4QixNQUFNRyxlQUFlTixRQUFRTyxNQUFNLENBQUNDLEtBQUssQ0FBQ0MsUUFBUSxDQUFDQyxLQUFLLENBQUNDLEdBQUcsQ0FBQ1Ysb0JBQW9CRSxJQUFJLENBQUNDLFNBQVM7UUFDL0YsSUFBSTtZQUNGLElBQUlFLGFBQWFNLFdBQVcsTUFBTSxDQUFDWixRQUFRYSxNQUFNLENBQUNDLEdBQUcsRUFBRTtnQkFDckQsTUFBTUMsaUJBQWlCLE1BQU1ULGFBQWFVLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDakIsUUFBUWtCLEVBQUU7Z0JBQ2pFLGdDQUFnQztnQkFDaEMsZ0NBQWdDO2dCQUNoQyxJQUFJbEIsUUFBUU8sTUFBTSxDQUFDWSxLQUFLLENBQUNULEtBQUssQ0FBQ1UsR0FBRyxDQUFDLHVCQUF1QjtvQkFDeEQ7Z0JBQ0Y7Z0JBQ0YsSUFBSXBCLFFBQVFxQixXQUFXLENBQUNDLElBQUksR0FBRyxHQUFHO29CQUNoQ0MsUUFBUUMsR0FBRyxDQUFDeEIsUUFBUXFCLFdBQVc7b0JBQy9CLE1BQU1JLFFBQVFDLE1BQU1DLElBQUksQ0FBQzNCLFFBQVFxQixXQUFXLENBQUNPLE1BQU0sSUFDbERDLE1BQU0sQ0FBQyxDQUFDQyxhQUFlL0Isa0JBQWtCZ0MsUUFBUSxDQUFDRCxXQUFXRSxXQUFXLEdBQ3hFQyxHQUFHLENBQUMsQ0FBQ0gsYUFBZUEsV0FBV0ksR0FBRztvQkFDbkMsTUFBTW5CLGVBQWVvQixNQUFNO29CQUMzQixJQUFJVixTQUFTQSxNQUFNVyxNQUFNLEdBQUcsS0FBS3BDLFFBQVFPLE1BQU0sQ0FBQ1ksS0FBSyxDQUFDVCxLQUFLLENBQUMyQixJQUFJLEVBQUU7d0JBQ2hFLE1BQU0vQixhQUFhZ0MsSUFBSSxDQUFDOzRCQUFDQyxTQUFTLENBQUMsV0FBVyxFQUFFdkMsUUFBUWEsTUFBTSxDQUFDMkIsUUFBUSxDQUFDLEVBQUV4QyxRQUFRYSxNQUFNLENBQUM0QixhQUFhLEtBQUssTUFDM0csQ0FBQyxDQUFDLEVBQUV6QyxRQUFRYSxNQUFNLENBQUM0QixhQUFhLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQzs0QkFBRWhCLE9BQU9BO3dCQUFLO29CQUN6RDtnQkFDRixPQUFPO29CQUNMLE1BQU1WLGVBQWVvQixNQUFNO2dCQUM3QjtZQUNGO1FBQ0osRUFBRSxPQUFPTyxPQUFPO1lBQ2RuQixRQUFRQyxHQUFHLENBQUM7WUFDWkQsUUFBUUMsR0FBRyxDQUFDa0I7UUFDZDtJQUNGO0FBQ0YsQ0FBQSxFQUFDIn0=