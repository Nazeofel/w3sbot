import { allowedMediaTypes } from "../../../types/config.js";
import { Flashcore } from "@roboplay/robo.js";
export default (async (message)=>{
    const mediaChannelData = await Flashcore.get('media-channel', {
        namespace: message.guildId
    });
    if (mediaChannelData) {
        const parsed = JSON.parse(mediaChannelData);
        if (parsed && parsed.channelId === message.channelId) {
            const mediaChannel = message.member.guild.channels.cache.get(parsed.channelId);
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
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxtZWRpYS1jaGFubmVsc1xcZXZlbnRzXFxtZXNzYWdlQ3JlYXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJ1xyXG5pbXBvcnQgeyBhbGxvd2VkTWVkaWFUeXBlcyB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL2NvbmZpZy5qcyc7XHJcbmltcG9ydCB7IEZsYXNoY29yZSB9IGZyb20gJ0Byb2JvcGxheS9yb2JvLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XHJcbiAgY29uc3QgbWVkaWFDaGFubmVsRGF0YSA9IGF3YWl0IEZsYXNoY29yZS5nZXQoJ21lZGlhLWNoYW5uZWwnLCB7XHJcbiAgICBuYW1lc3BhY2U6IG1lc3NhZ2UuZ3VpbGRJZCFcclxuICB9KSBhcyBzdHJpbmc7XHJcbiAgaWYgKG1lZGlhQ2hhbm5lbERhdGEpIHtcclxuICAgIFxyXG4gICAgY29uc3QgcGFyc2VkID0gIEpTT04ucGFyc2UobWVkaWFDaGFubmVsRGF0YSk7XHJcbiAgICBpZihwYXJzZWQgJiYgcGFyc2VkLmNoYW5uZWxJZCA9PT0gbWVzc2FnZS5jaGFubmVsSWQpIHtcclxuICAgICAgICBjb25zdCBtZWRpYUNoYW5uZWwgPSBtZXNzYWdlLm1lbWJlci5ndWlsZC5jaGFubmVscy5jYWNoZS5nZXQocGFyc2VkLmNoYW5uZWxJZCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGlmIChtZWRpYUNoYW5uZWwuaXNUZXh0QmFzZWQoKSAmJiAhbWVzc2FnZS5hdXRob3IuYm90KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZldGNoZWRNZXNzYWdlID0gYXdhaXQgbWVkaWFDaGFubmVsLm1lc3NhZ2VzLmZldGNoKG1lc3NhZ2UuaWQpO1xyXG4gICAgICAgICAgICAgIC8vODk1MjI2MTI4Mzc2MTYwMjk2IC0gcHJvZCByb2xlXHJcbiAgICAgICAgICAgICAgLy8xMTEyMDMwMzA5NTg4OTQzMDE2IC0gZGV2IHJvbGVcclxuICAgICAgICAgICAgICBpZiAobWVzc2FnZS5tZW1iZXIucm9sZXMuY2FjaGUuaGFzKCc4OTUyMjYxMjgzNzYxNjAyOTYnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuYXR0YWNobWVudHMuc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLmF0dGFjaG1lbnRzKVxyXG4gICAgICAgICAgICAgIGNvbnN0IGZpbGVzID0gQXJyYXkuZnJvbShtZXNzYWdlLmF0dGFjaG1lbnRzLnZhbHVlcygpKVxyXG4gICAgICAgICAgICAgIC5maWx0ZXIoKGF0dGFjaG1lbnQpID0+IGFsbG93ZWRNZWRpYVR5cGVzLmluY2x1ZGVzKGF0dGFjaG1lbnQuY29udGVudFR5cGUpKVxyXG4gICAgICAgICAgICAgIC5tYXAoKGF0dGFjaG1lbnQpID0+IGF0dGFjaG1lbnQudXJsKTtcclxuICAgICAgICAgICAgICBhd2FpdCBmZXRjaGVkTWVzc2FnZS5kZWxldGUoKTtcclxuICAgICAgICAgICAgICBpZiAoZmlsZXMgJiYgZmlsZXMubGVuZ3RoID4gMCB8fCBtZXNzYWdlLm1lbWJlci5yb2xlcy5jYWNoZS5zb21lKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBtZWRpYUNoYW5uZWwuc2VuZCh7Y29udGVudDogYFBvc3RlZCBieSBAJHttZXNzYWdlLmF1dGhvci51c2VybmFtZX0ke21lc3NhZ2UuYXV0aG9yLmRpc2NyaW1pbmF0b3IgIT09ICcwJyA/IFxyXG4gICAgICAgICAgICAgICAgYCMke21lc3NhZ2UuYXV0aG9yLmRpc2NyaW1pbmF0b3J9YCA6ICcnfWAsIGZpbGVzOiBmaWxlc30pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGF3YWl0IGZldGNoZWRNZXNzYWdlLmRlbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9ICAgIFxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdtZWRpYS1jaGFubmVscyAtPiBtZXNzYWdlQ3JlYXRlLnRzIC0+IGNhdGNoKGVycm9yKTogJylcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJhbGxvd2VkTWVkaWFUeXBlcyIsIkZsYXNoY29yZSIsIm1lc3NhZ2UiLCJtZWRpYUNoYW5uZWxEYXRhIiwiZ2V0IiwibmFtZXNwYWNlIiwiZ3VpbGRJZCIsInBhcnNlZCIsIkpTT04iLCJwYXJzZSIsImNoYW5uZWxJZCIsIm1lZGlhQ2hhbm5lbCIsIm1lbWJlciIsImd1aWxkIiwiY2hhbm5lbHMiLCJjYWNoZSIsImlzVGV4dEJhc2VkIiwiYXV0aG9yIiwiYm90IiwiZmV0Y2hlZE1lc3NhZ2UiLCJtZXNzYWdlcyIsImZldGNoIiwiaWQiLCJyb2xlcyIsImhhcyIsImF0dGFjaG1lbnRzIiwic2l6ZSIsImNvbnNvbGUiLCJsb2ciLCJmaWxlcyIsIkFycmF5IiwiZnJvbSIsInZhbHVlcyIsImZpbHRlciIsImF0dGFjaG1lbnQiLCJpbmNsdWRlcyIsImNvbnRlbnRUeXBlIiwibWFwIiwidXJsIiwiZGVsZXRlIiwibGVuZ3RoIiwic29tZSIsInNlbmQiLCJjb250ZW50IiwidXNlcm5hbWUiLCJkaXNjcmltaW5hdG9yIiwiZXJyb3IiXSwibWFwcGluZ3MiOiJBQUNBLFNBQVNBLGlCQUFpQixRQUFRLDJCQUEyQjtBQUM3RCxTQUFTQyxTQUFTLFFBQVEsb0JBQW9CO0FBRTlDLGVBQWUsQ0FBQSxPQUFPQztJQUNwQixNQUFNQyxtQkFBbUIsTUFBTUYsVUFBVUcsR0FBRyxDQUFDLGlCQUFpQjtRQUM1REMsV0FBV0gsUUFBUUksT0FBTztJQUM1QjtJQUNBLElBQUlILGtCQUFrQjtRQUVwQixNQUFNSSxTQUFVQyxLQUFLQyxLQUFLLENBQUNOO1FBQzNCLElBQUdJLFVBQVVBLE9BQU9HLFNBQVMsS0FBS1IsUUFBUVEsU0FBUyxFQUFFO1lBQ2pELE1BQU1DLGVBQWVULFFBQVFVLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDQyxRQUFRLENBQUNDLEtBQUssQ0FBQ1gsR0FBRyxDQUFDRyxPQUFPRyxTQUFTO1lBQzdFLElBQUk7Z0JBQ0YsSUFBSUMsYUFBYUssV0FBVyxNQUFNLENBQUNkLFFBQVFlLE1BQU0sQ0FBQ0MsR0FBRyxFQUFFO29CQUNyRCxNQUFNQyxpQkFBaUIsTUFBTVIsYUFBYVMsUUFBUSxDQUFDQyxLQUFLLENBQUNuQixRQUFRb0IsRUFBRTtvQkFDakUsZ0NBQWdDO29CQUNoQyxnQ0FBZ0M7b0JBQ2hDLElBQUlwQixRQUFRVSxNQUFNLENBQUNXLEtBQUssQ0FBQ1IsS0FBSyxDQUFDUyxHQUFHLENBQUMsdUJBQXVCO3dCQUN4RDtvQkFDRjtvQkFDRixJQUFJdEIsUUFBUXVCLFdBQVcsQ0FBQ0MsSUFBSSxHQUFHLEdBQUc7d0JBQ2hDQyxRQUFRQyxHQUFHLENBQUMxQixRQUFRdUIsV0FBVzt3QkFDL0IsTUFBTUksUUFBUUMsTUFBTUMsSUFBSSxDQUFDN0IsUUFBUXVCLFdBQVcsQ0FBQ08sTUFBTSxJQUNsREMsTUFBTSxDQUFDLENBQUNDLGFBQWVsQyxrQkFBa0JtQyxRQUFRLENBQUNELFdBQVdFLFdBQVcsR0FDeEVDLEdBQUcsQ0FBQyxDQUFDSCxhQUFlQSxXQUFXSSxHQUFHO3dCQUNuQyxNQUFNbkIsZUFBZW9CLE1BQU07d0JBQzNCLElBQUlWLFNBQVNBLE1BQU1XLE1BQU0sR0FBRyxLQUFLdEMsUUFBUVUsTUFBTSxDQUFDVyxLQUFLLENBQUNSLEtBQUssQ0FBQzBCLElBQUksRUFBRTs0QkFDaEUsTUFBTTlCLGFBQWErQixJQUFJLENBQUM7Z0NBQUNDLFNBQVMsQ0FBQyxXQUFXLEVBQUV6QyxRQUFRZSxNQUFNLENBQUMyQixRQUFRLENBQUMsRUFBRTFDLFFBQVFlLE1BQU0sQ0FBQzRCLGFBQWEsS0FBSyxNQUMzRyxDQUFDLENBQUMsRUFBRTNDLFFBQVFlLE1BQU0sQ0FBQzRCLGFBQWEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dDQUFFaEIsT0FBT0E7NEJBQUs7d0JBQ3pEO29CQUNGLE9BQU87d0JBQ0wsTUFBTVYsZUFBZW9CLE1BQU07b0JBQzdCO2dCQUNGO1lBQ0osRUFBRSxPQUFPTyxPQUFPO2dCQUNkbkIsUUFBUUMsR0FBRyxDQUFDO2dCQUNaRCxRQUFRQyxHQUFHLENBQUNrQjtZQUNkO1FBQ0Y7SUFDRjtBQUNGLENBQUEsRUFBQyJ9