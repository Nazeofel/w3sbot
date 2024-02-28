import { AttachmentBuilder, AuditLogEvent } from "discord.js";
import dbService from "../../../db/service/index.js";
import messageUtil from "./utilities/message-template.js";
export default (async (message)=>{
    const auditLogs = await message.guild.fetchAuditLogs({
        type: AuditLogEvent.MessageDelete,
        limit: 1
    });
    const firstEntry = auditLogs.entries.first();
    console.log('Message Delete -> Executor -> ', firstEntry.executor.username);
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
            const messageTemplate = messageUtil.generateEmbedMessage(message, 'deleted', message.attachments.size, firstEntry.executor);
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
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxhdWRpdC1sb2dcXGV2ZW50c1xcbWVzc2FnZURlbGV0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlLCBBdHRhY2htZW50QnVpbGRlciwgQXVkaXRMb2dFdmVudCAgfSBmcm9tICdkaXNjb3JkLmpzJ1xyXG5pbXBvcnQgZGJTZXJ2aWNlIGZyb20gJy4uLy4uLy4uL2RiL3NlcnZpY2UvaW5kZXguanMnO1xyXG5pbXBvcnQgbWVzc2FnZVV0aWwgZnJvbSAnLi91dGlsaXRpZXMvbWVzc2FnZS10ZW1wbGF0ZS5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAobWVzc2FnZTogTWVzc2FnZSkgPT4ge1xyXG4gIGNvbnN0IGF1ZGl0TG9ncyA9IGF3YWl0IG1lc3NhZ2UuZ3VpbGQuZmV0Y2hBdWRpdExvZ3Moe1xyXG4gICAgdHlwZTogQXVkaXRMb2dFdmVudC5NZXNzYWdlRGVsZXRlLCBcclxuICAgIGxpbWl0OiAxXHJcbiAgfSlcclxuICBjb25zdCBmaXJzdEVudHJ5ID0gYXVkaXRMb2dzLmVudHJpZXMuZmlyc3QoKTtcclxuICBjb25zb2xlLmxvZygnTWVzc2FnZSBEZWxldGUgLT4gRXhlY3V0b3IgLT4gJywgZmlyc3RFbnRyeS5leGVjdXRvci51c2VybmFtZSlcclxuICBjb25zdCBhdHRhY2htZW50c0FycmF5ID0gW107XHJcbiAgaWYobWVzc2FnZS5hdHRhY2htZW50cy5zaXplID4gMCkge1xyXG4gICAgbWVzc2FnZS5hdHRhY2htZW50cy5tYXAoYXR0YWNobWVudCA9PiB7XHJcbiAgICAgIGNvbnN0IGF0dCA9IG5ldyBBdHRhY2htZW50QnVpbGRlcihhdHRhY2htZW50LnVybClcclxuICAgICAgYXR0YWNobWVudHNBcnJheS5wdXNoKGF0dCk7XHJcbiAgICB9KSAgXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKCdObyBhdHRhY2htZW50cycpXHJcbiAgfVxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBhdWRpdENoYW5uZWxSZXF1ZXN0ID0gYXdhaXQgZGJTZXJ2aWNlLmdldEF1ZGl0TG9nQ2hhbm5lbCgpO1xyXG4gICAgaWYgKGF1ZGl0Q2hhbm5lbFJlcXVlc3QgJiYgYXVkaXRDaGFubmVsUmVxdWVzdC5jb2RlID09PSAyMDAgJiYgYXVkaXRDaGFubmVsUmVxdWVzdC5kYXRhKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2VUZW1wbGF0ZSA9IG1lc3NhZ2VVdGlsLmdlbmVyYXRlRW1iZWRNZXNzYWdlKG1lc3NhZ2UsICdkZWxldGVkJywgbWVzc2FnZS5hdHRhY2htZW50cy5zaXplLCBmaXJzdEVudHJ5LmV4ZWN1dG9yKTtcclxuICAgICAgY29uc3QgYXVkaXRDaGFubmVsID0gbWVzc2FnZS5ndWlsZC5jaGFubmVscy5jYWNoZS5nZXQoYXVkaXRDaGFubmVsUmVxdWVzdC5kYXRhLmNoYW5uZWxJZCk7XHJcbiAgICAgIGlmKCFhdWRpdENoYW5uZWwpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBDaGFubmVsIHdpdGggaWQgJHthdWRpdENoYW5uZWxSZXF1ZXN0LmRhdGEuY2hhbm5lbElkfSBub3QgZm91bmRgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKGF1ZGl0Q2hhbm5lbC5pc1RleHRCYXNlZCgpKSB7XHJcbiAgICAgICAgYXdhaXQgYXVkaXRDaGFubmVsLnNlbmQoe2VtYmVkczogW21lc3NhZ2VUZW1wbGF0ZV0sIGZpbGVzOiBhdHRhY2htZW50c0FycmF5fSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkF0dGFjaG1lbnRCdWlsZGVyIiwiQXVkaXRMb2dFdmVudCIsImRiU2VydmljZSIsIm1lc3NhZ2VVdGlsIiwibWVzc2FnZSIsImF1ZGl0TG9ncyIsImd1aWxkIiwiZmV0Y2hBdWRpdExvZ3MiLCJ0eXBlIiwiTWVzc2FnZURlbGV0ZSIsImxpbWl0IiwiZmlyc3RFbnRyeSIsImVudHJpZXMiLCJmaXJzdCIsImNvbnNvbGUiLCJsb2ciLCJleGVjdXRvciIsInVzZXJuYW1lIiwiYXR0YWNobWVudHNBcnJheSIsImF0dGFjaG1lbnRzIiwic2l6ZSIsIm1hcCIsImF0dGFjaG1lbnQiLCJhdHQiLCJ1cmwiLCJwdXNoIiwiYXVkaXRDaGFubmVsUmVxdWVzdCIsImdldEF1ZGl0TG9nQ2hhbm5lbCIsImNvZGUiLCJkYXRhIiwibWVzc2FnZVRlbXBsYXRlIiwiZ2VuZXJhdGVFbWJlZE1lc3NhZ2UiLCJhdWRpdENoYW5uZWwiLCJjaGFubmVscyIsImNhY2hlIiwiZ2V0IiwiY2hhbm5lbElkIiwiZXJyb3IiLCJpc1RleHRCYXNlZCIsInNlbmQiLCJlbWJlZHMiLCJmaWxlcyJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBa0JBLGlCQUFpQixFQUFFQyxhQUFhLFFBQVMsYUFBWTtBQUN2RSxPQUFPQyxlQUFlLCtCQUErQjtBQUNyRCxPQUFPQyxpQkFBaUIsa0NBQWtDO0FBRTFELGVBQWUsQ0FBQSxPQUFPQztJQUNwQixNQUFNQyxZQUFZLE1BQU1ELFFBQVFFLEtBQUssQ0FBQ0MsY0FBYyxDQUFDO1FBQ25EQyxNQUFNUCxjQUFjUSxhQUFhO1FBQ2pDQyxPQUFPO0lBQ1Q7SUFDQSxNQUFNQyxhQUFhTixVQUFVTyxPQUFPLENBQUNDLEtBQUs7SUFDMUNDLFFBQVFDLEdBQUcsQ0FBQyxrQ0FBa0NKLFdBQVdLLFFBQVEsQ0FBQ0MsUUFBUTtJQUMxRSxNQUFNQyxtQkFBbUIsRUFBRTtJQUMzQixJQUFHZCxRQUFRZSxXQUFXLENBQUNDLElBQUksR0FBRyxHQUFHO1FBQy9CaEIsUUFBUWUsV0FBVyxDQUFDRSxHQUFHLENBQUNDLENBQUFBO1lBQ3RCLE1BQU1DLE1BQU0sSUFBSXZCLGtCQUFrQnNCLFdBQVdFLEdBQUc7WUFDaEROLGlCQUFpQk8sSUFBSSxDQUFDRjtRQUN4QjtJQUNGLE9BQU87UUFDTFQsUUFBUUMsR0FBRyxDQUFDO0lBQ2Q7SUFDQSxJQUFJO1FBQ0YsTUFBTVcsc0JBQXNCLE1BQU14QixVQUFVeUIsa0JBQWtCO1FBQzlELElBQUlELHVCQUF1QkEsb0JBQW9CRSxJQUFJLEtBQUssT0FBT0Ysb0JBQW9CRyxJQUFJLEVBQUU7WUFDdkYsTUFBTUMsa0JBQWtCM0IsWUFBWTRCLG9CQUFvQixDQUFDM0IsU0FBUyxXQUFXQSxRQUFRZSxXQUFXLENBQUNDLElBQUksRUFBRVQsV0FBV0ssUUFBUTtZQUMxSCxNQUFNZ0IsZUFBZTVCLFFBQVFFLEtBQUssQ0FBQzJCLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDQyxHQUFHLENBQUNULG9CQUFvQkcsSUFBSSxDQUFDTyxTQUFTO1lBQ3hGLElBQUcsQ0FBQ0osY0FBYztnQkFDaEJsQixRQUFRdUIsS0FBSyxDQUFDLENBQUMsZ0JBQWdCLEVBQUVYLG9CQUFvQkcsSUFBSSxDQUFDTyxTQUFTLENBQUMsVUFBVSxDQUFDO2dCQUMvRTtZQUNGO1lBRUEsSUFBR0osYUFBYU0sV0FBVyxJQUFJO2dCQUM3QixNQUFNTixhQUFhTyxJQUFJLENBQUM7b0JBQUNDLFFBQVE7d0JBQUNWO3FCQUFnQjtvQkFBRVcsT0FBT3ZCO2dCQUFnQjtZQUM3RTtRQUNGO0lBQ0YsRUFBRSxPQUFPbUIsT0FBTztRQUNkdkIsUUFBUUMsR0FBRyxDQUFDc0I7SUFDZDtBQUNGLENBQUEsRUFBQyJ9