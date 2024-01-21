import { AttachmentBuilder, AuditLogEvent } from "discord.js";
import dbService from "../../../db/service/index.js";
import messageUtil from "./utilities/message-template.js";
export default (async (message)=>{
    const auditLogs = await message.guild.fetchAuditLogs({
        type: AuditLogEvent.MessageDelete,
        limit: 1
    });
    const firstEntry = auditLogs.entries.first();
    console.log('Message Update -> Executor -> ', firstEntry.executor.username);
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
                const auditChannelRequest = await dbService.getAuditLogChannel();
                if (auditChannelRequest && auditChannelRequest.code === 200 && auditChannelRequest.data) {
                    const messageTemplate = messageUtil.generateEmbedMessage(message, 'updated', message.attachments.size, firstEntry.executor);
                    const auditChannel = message.guild.channels.cache.get(auditChannelRequest.data.channelId);
                    if (!auditChannel) {
                        console.error(`Channel with id ${auditChannelRequest.data.channelId} not found`);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxhdWRpdC1sb2dcXGV2ZW50c1xcbWVzc2FnZVVwZGF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlLCBBdHRhY2htZW50QnVpbGRlciwgQXVkaXRMb2dFdmVudCB9IGZyb20gJ2Rpc2NvcmQuanMnXHJcbmltcG9ydCBkYlNlcnZpY2UgZnJvbSAnLi4vLi4vLi4vZGIvc2VydmljZS9pbmRleC5qcyc7XHJcbmltcG9ydCBtZXNzYWdlVXRpbCBmcm9tICcuL3V0aWxpdGllcy9tZXNzYWdlLXRlbXBsYXRlLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XHJcbiAgY29uc3QgYXVkaXRMb2dzID0gYXdhaXQgbWVzc2FnZS5ndWlsZC5mZXRjaEF1ZGl0TG9ncyh7XHJcbiAgICB0eXBlOiBBdWRpdExvZ0V2ZW50Lk1lc3NhZ2VEZWxldGUsIFxyXG4gICAgbGltaXQ6IDFcclxuICB9KVxyXG4gIGNvbnN0IGZpcnN0RW50cnkgPSBhdWRpdExvZ3MuZW50cmllcy5maXJzdCgpO1xyXG4gIGNvbnNvbGUubG9nKCdNZXNzYWdlIFVwZGF0ZSAtPiBFeGVjdXRvciAtPiAnLCBmaXJzdEVudHJ5LmV4ZWN1dG9yLnVzZXJuYW1lKVxyXG4gIGlmKCFtZXNzYWdlLmF1dGhvci5ib3QpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGF0dGFjaG1lbnRzQXJyYXkgPSBbXTtcclxuICAgICAgaWYobWVzc2FnZS5hdHRhY2htZW50cy5zaXplID4gMCkge1xyXG4gICAgICAgIG1lc3NhZ2UuYXR0YWNobWVudHMubWFwKGF0dGFjaG1lbnQgPT4ge1xyXG4gICAgICAgICAgY29uc3QgYXR0ID0gbmV3IEF0dGFjaG1lbnRCdWlsZGVyKGF0dGFjaG1lbnQudXJsKVxyXG4gICAgICAgICAgYXR0YWNobWVudHNBcnJheS5wdXNoKGF0dCk7XHJcbiAgICAgICAgfSkgIFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdObyBhdHRhY2htZW50cycpXHJcbiAgICAgIH1cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBhdWRpdENoYW5uZWxSZXF1ZXN0ID0gYXdhaXQgZGJTZXJ2aWNlLmdldEF1ZGl0TG9nQ2hhbm5lbCgpO1xyXG4gICAgICAgIGlmIChhdWRpdENoYW5uZWxSZXF1ZXN0ICYmIGF1ZGl0Q2hhbm5lbFJlcXVlc3QuY29kZSA9PT0gMjAwICYmIGF1ZGl0Q2hhbm5lbFJlcXVlc3QuZGF0YSkge1xyXG4gICAgICAgICAgY29uc3QgbWVzc2FnZVRlbXBsYXRlID0gbWVzc2FnZVV0aWwuZ2VuZXJhdGVFbWJlZE1lc3NhZ2UobWVzc2FnZSwgJ3VwZGF0ZWQnLCBtZXNzYWdlLmF0dGFjaG1lbnRzLnNpemUsIGZpcnN0RW50cnkuZXhlY3V0b3IpO1xyXG4gICAgICAgICAgY29uc3QgYXVkaXRDaGFubmVsID0gbWVzc2FnZS5ndWlsZC5jaGFubmVscy5jYWNoZS5nZXQoYXVkaXRDaGFubmVsUmVxdWVzdC5kYXRhLmNoYW5uZWxJZCk7XHJcbiAgICBcclxuICAgICAgICAgIGlmKCFhdWRpdENoYW5uZWwpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQ2hhbm5lbCB3aXRoIGlkICR7YXVkaXRDaGFubmVsUmVxdWVzdC5kYXRhLmNoYW5uZWxJZH0gbm90IGZvdW5kYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZihhdWRpdENoYW5uZWwuaXNUZXh0QmFzZWQoKSkge1xyXG4gICAgICAgICAgICBhd2FpdCBhdWRpdENoYW5uZWwuc2VuZCh7ZW1iZWRzOiBbbWVzc2FnZVRlbXBsYXRlXSwgZmlsZXM6IGF0dGFjaG1lbnRzQXJyYXl9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkF0dGFjaG1lbnRCdWlsZGVyIiwiQXVkaXRMb2dFdmVudCIsImRiU2VydmljZSIsIm1lc3NhZ2VVdGlsIiwibWVzc2FnZSIsImF1ZGl0TG9ncyIsImd1aWxkIiwiZmV0Y2hBdWRpdExvZ3MiLCJ0eXBlIiwiTWVzc2FnZURlbGV0ZSIsImxpbWl0IiwiZmlyc3RFbnRyeSIsImVudHJpZXMiLCJmaXJzdCIsImNvbnNvbGUiLCJsb2ciLCJleGVjdXRvciIsInVzZXJuYW1lIiwiYXV0aG9yIiwiYm90IiwiYXR0YWNobWVudHNBcnJheSIsImF0dGFjaG1lbnRzIiwic2l6ZSIsIm1hcCIsImF0dGFjaG1lbnQiLCJhdHQiLCJ1cmwiLCJwdXNoIiwiYXVkaXRDaGFubmVsUmVxdWVzdCIsImdldEF1ZGl0TG9nQ2hhbm5lbCIsImNvZGUiLCJkYXRhIiwibWVzc2FnZVRlbXBsYXRlIiwiZ2VuZXJhdGVFbWJlZE1lc3NhZ2UiLCJhdWRpdENoYW5uZWwiLCJjaGFubmVscyIsImNhY2hlIiwiZ2V0IiwiY2hhbm5lbElkIiwiZXJyb3IiLCJpc1RleHRCYXNlZCIsInNlbmQiLCJlbWJlZHMiLCJmaWxlcyJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBa0JBLGlCQUFpQixFQUFFQyxhQUFhLFFBQVEsYUFBWTtBQUN0RSxPQUFPQyxlQUFlLCtCQUErQjtBQUNyRCxPQUFPQyxpQkFBaUIsa0NBQWtDO0FBRTFELGVBQWUsQ0FBQSxPQUFPQztJQUNwQixNQUFNQyxZQUFZLE1BQU1ELFFBQVFFLEtBQUssQ0FBQ0MsY0FBYyxDQUFDO1FBQ25EQyxNQUFNUCxjQUFjUSxhQUFhO1FBQ2pDQyxPQUFPO0lBQ1Q7SUFDQSxNQUFNQyxhQUFhTixVQUFVTyxPQUFPLENBQUNDLEtBQUs7SUFDMUNDLFFBQVFDLEdBQUcsQ0FBQyxrQ0FBa0NKLFdBQVdLLFFBQVEsQ0FBQ0MsUUFBUTtJQUMxRSxJQUFHLENBQUNiLFFBQVFjLE1BQU0sQ0FBQ0MsR0FBRyxFQUFFO1FBQ3RCLElBQUk7WUFDRixNQUFNQyxtQkFBbUIsRUFBRTtZQUMzQixJQUFHaEIsUUFBUWlCLFdBQVcsQ0FBQ0MsSUFBSSxHQUFHLEdBQUc7Z0JBQy9CbEIsUUFBUWlCLFdBQVcsQ0FBQ0UsR0FBRyxDQUFDQyxDQUFBQTtvQkFDdEIsTUFBTUMsTUFBTSxJQUFJekIsa0JBQWtCd0IsV0FBV0UsR0FBRztvQkFDaEROLGlCQUFpQk8sSUFBSSxDQUFDRjtnQkFDeEI7WUFDRixPQUFPO2dCQUNMWCxRQUFRQyxHQUFHLENBQUM7WUFDZDtZQUNBLElBQUk7Z0JBQ0YsTUFBTWEsc0JBQXNCLE1BQU0xQixVQUFVMkIsa0JBQWtCO2dCQUM5RCxJQUFJRCx1QkFBdUJBLG9CQUFvQkUsSUFBSSxLQUFLLE9BQU9GLG9CQUFvQkcsSUFBSSxFQUFFO29CQUN2RixNQUFNQyxrQkFBa0I3QixZQUFZOEIsb0JBQW9CLENBQUM3QixTQUFTLFdBQVdBLFFBQVFpQixXQUFXLENBQUNDLElBQUksRUFBRVgsV0FBV0ssUUFBUTtvQkFDMUgsTUFBTWtCLGVBQWU5QixRQUFRRSxLQUFLLENBQUM2QixRQUFRLENBQUNDLEtBQUssQ0FBQ0MsR0FBRyxDQUFDVCxvQkFBb0JHLElBQUksQ0FBQ08sU0FBUztvQkFFeEYsSUFBRyxDQUFDSixjQUFjO3dCQUNoQnBCLFFBQVF5QixLQUFLLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRVgsb0JBQW9CRyxJQUFJLENBQUNPLFNBQVMsQ0FBQyxVQUFVLENBQUM7d0JBQy9FO29CQUNGO29CQUVBLElBQUdKLGFBQWFNLFdBQVcsSUFBSTt3QkFDN0IsTUFBTU4sYUFBYU8sSUFBSSxDQUFDOzRCQUFDQyxRQUFRO2dDQUFDVjs2QkFBZ0I7NEJBQUVXLE9BQU92Qjt3QkFBZ0I7b0JBQzdFO2dCQUNGO1lBQ0YsRUFBRSxPQUFPbUIsT0FBTztnQkFDZHpCLFFBQVFDLEdBQUcsQ0FBQ3dCO1lBQ2Q7UUFDRixFQUFFLE9BQU9BLE9BQU87WUFDWnpCLFFBQVFDLEdBQUcsQ0FBQ3dCO1FBQ2hCO0lBQ0Y7QUFDRixDQUFBLEVBQUMifQ==