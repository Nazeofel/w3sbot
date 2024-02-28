import { AttachmentBuilder } from "discord.js";
import messageUtil from "./utilities/message-template.js";
import { Flashcore } from "@roboplay/robo.js";
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
                const auditLogChannelData = await Flashcore.get('media-channel', {
                    namespace: message.guildId
                });
                if (auditLogChannelData) {
                    const parsed = JSON.parse(auditLogChannelData);
                    const messageTemplate = messageUtil.generateEmbedMessage(message, 'updated', message.attachments.size, null);
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
        } catch (error) {
            console.log(error);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxhdWRpdC1sb2dcXGV2ZW50c1xcbWVzc2FnZVVwZGF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlLCBBdHRhY2htZW50QnVpbGRlciB9IGZyb20gJ2Rpc2NvcmQuanMnXHJcbmltcG9ydCBtZXNzYWdlVXRpbCBmcm9tICcuL3V0aWxpdGllcy9tZXNzYWdlLXRlbXBsYXRlLmpzJztcclxuaW1wb3J0IHsgRmxhc2hjb3JlIH0gZnJvbSAnQHJvYm9wbGF5L3JvYm8uanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcclxuICBpZighbWVzc2FnZS5hdXRob3IuYm90KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBhdHRhY2htZW50c0FycmF5ID0gW107XHJcbiAgICAgIGlmKG1lc3NhZ2UuYXR0YWNobWVudHMuc2l6ZSA+IDApIHtcclxuICAgICAgICBtZXNzYWdlLmF0dGFjaG1lbnRzLm1hcChhdHRhY2htZW50ID0+IHtcclxuICAgICAgICAgIGNvbnN0IGF0dCA9IG5ldyBBdHRhY2htZW50QnVpbGRlcihhdHRhY2htZW50LnVybClcclxuICAgICAgICAgIGF0dGFjaG1lbnRzQXJyYXkucHVzaChhdHQpO1xyXG4gICAgICAgIH0pICBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnTm8gYXR0YWNobWVudHMnKVxyXG4gICAgICB9XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgYXVkaXRMb2dDaGFubmVsRGF0YSA9IGF3YWl0IEZsYXNoY29yZS5nZXQoJ21lZGlhLWNoYW5uZWwnLCB7XHJcbiAgICAgICAgICBuYW1lc3BhY2U6IG1lc3NhZ2UuZ3VpbGRJZCFcclxuICAgICAgICB9KSBhcyBzdHJpbmc7XHJcbiAgICAgICAgaWYgKGF1ZGl0TG9nQ2hhbm5lbERhdGEpIHtcclxuICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoYXVkaXRMb2dDaGFubmVsRGF0YSk7XHJcbiAgICAgICAgICBjb25zdCBtZXNzYWdlVGVtcGxhdGUgPSBtZXNzYWdlVXRpbC5nZW5lcmF0ZUVtYmVkTWVzc2FnZShtZXNzYWdlLCAndXBkYXRlZCcsIG1lc3NhZ2UuYXR0YWNobWVudHMuc2l6ZSwgbnVsbCk7XHJcbiAgICAgICAgICBjb25zdCBhdWRpdENoYW5uZWwgPSBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzLmNhY2hlLmdldChwYXJzZWQuY2hhbm5lbElkKTtcclxuICAgIFxyXG4gICAgICAgICAgaWYoIWF1ZGl0Q2hhbm5lbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBDaGFubmVsIHdpdGggaWQgJHtwYXJzZWQuY2hhbm5lbElkfSBub3QgZm91bmRgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmKGF1ZGl0Q2hhbm5lbC5pc1RleHRCYXNlZCgpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGF1ZGl0Q2hhbm5lbC5zZW5kKHtlbWJlZHM6IFttZXNzYWdlVGVtcGxhdGVdLCBmaWxlczogYXR0YWNobWVudHNBcnJheX0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiQXR0YWNobWVudEJ1aWxkZXIiLCJtZXNzYWdlVXRpbCIsIkZsYXNoY29yZSIsIm1lc3NhZ2UiLCJhdXRob3IiLCJib3QiLCJhdHRhY2htZW50c0FycmF5IiwiYXR0YWNobWVudHMiLCJzaXplIiwibWFwIiwiYXR0YWNobWVudCIsImF0dCIsInVybCIsInB1c2giLCJjb25zb2xlIiwibG9nIiwiYXVkaXRMb2dDaGFubmVsRGF0YSIsImdldCIsIm5hbWVzcGFjZSIsImd1aWxkSWQiLCJwYXJzZWQiLCJKU09OIiwicGFyc2UiLCJtZXNzYWdlVGVtcGxhdGUiLCJnZW5lcmF0ZUVtYmVkTWVzc2FnZSIsImF1ZGl0Q2hhbm5lbCIsImd1aWxkIiwiY2hhbm5lbHMiLCJjYWNoZSIsImNoYW5uZWxJZCIsImVycm9yIiwiaXNUZXh0QmFzZWQiLCJzZW5kIiwiZW1iZWRzIiwiZmlsZXMiXSwibWFwcGluZ3MiOiJBQUFBLFNBQWtCQSxpQkFBaUIsUUFBUSxhQUFZO0FBQ3ZELE9BQU9DLGlCQUFpQixrQ0FBa0M7QUFDMUQsU0FBU0MsU0FBUyxRQUFRLG9CQUFvQjtBQUU5QyxlQUFlLENBQUEsT0FBT0M7SUFDcEIsSUFBRyxDQUFDQSxRQUFRQyxNQUFNLENBQUNDLEdBQUcsRUFBRTtRQUN0QixJQUFJO1lBQ0YsTUFBTUMsbUJBQW1CLEVBQUU7WUFDM0IsSUFBR0gsUUFBUUksV0FBVyxDQUFDQyxJQUFJLEdBQUcsR0FBRztnQkFDL0JMLFFBQVFJLFdBQVcsQ0FBQ0UsR0FBRyxDQUFDQyxDQUFBQTtvQkFDdEIsTUFBTUMsTUFBTSxJQUFJWCxrQkFBa0JVLFdBQVdFLEdBQUc7b0JBQ2hETixpQkFBaUJPLElBQUksQ0FBQ0Y7Z0JBQ3hCO1lBQ0YsT0FBTztnQkFDTEcsUUFBUUMsR0FBRyxDQUFDO1lBQ2Q7WUFDQSxJQUFJO2dCQUNGLE1BQU1DLHNCQUFzQixNQUFNZCxVQUFVZSxHQUFHLENBQUMsaUJBQWlCO29CQUMvREMsV0FBV2YsUUFBUWdCLE9BQU87Z0JBQzVCO2dCQUNBLElBQUlILHFCQUFxQjtvQkFDdkIsTUFBTUksU0FBU0MsS0FBS0MsS0FBSyxDQUFDTjtvQkFDMUIsTUFBTU8sa0JBQWtCdEIsWUFBWXVCLG9CQUFvQixDQUFDckIsU0FBUyxXQUFXQSxRQUFRSSxXQUFXLENBQUNDLElBQUksRUFBRTtvQkFDdkcsTUFBTWlCLGVBQWV0QixRQUFRdUIsS0FBSyxDQUFDQyxRQUFRLENBQUNDLEtBQUssQ0FBQ1gsR0FBRyxDQUFDRyxPQUFPUyxTQUFTO29CQUV0RSxJQUFHLENBQUNKLGNBQWM7d0JBQ2hCWCxRQUFRZ0IsS0FBSyxDQUFDLENBQUMsZ0JBQWdCLEVBQUVWLE9BQU9TLFNBQVMsQ0FBQyxVQUFVLENBQUM7d0JBQzdEO29CQUNGO29CQUVBLElBQUdKLGFBQWFNLFdBQVcsSUFBSTt3QkFDN0IsTUFBTU4sYUFBYU8sSUFBSSxDQUFDOzRCQUFDQyxRQUFRO2dDQUFDVjs2QkFBZ0I7NEJBQUVXLE9BQU81Qjt3QkFBZ0I7b0JBQzdFO2dCQUNGO1lBQ0YsRUFBRSxPQUFPd0IsT0FBTztnQkFDZGhCLFFBQVFDLEdBQUcsQ0FBQ2U7WUFDZDtRQUNGLEVBQUUsT0FBT0EsT0FBTztZQUNaaEIsUUFBUUMsR0FBRyxDQUFDZTtRQUNoQjtJQUNGO0FBQ0YsQ0FBQSxFQUFDIn0=