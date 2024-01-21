import { EmbedBuilder } from "discord.js";
export default {
    generateEmbedMessage: (message, eventType, attachmentsSize, executor)=>{
        const channel = message.guild.channels.cache.find((ch)=>ch.id === message.channelId);
        let event;
        switch(eventType){
            case 'updated':
                event = 'UPDATE';
                break;
            case 'deleted':
                event = 'DELETE';
                break;
        }
        const embed = new EmbedBuilder().setColor(0x0099ff).addFields({
            name: `Message ${eventType} in a channel <#${channel.id}>`,
            value: '\u200B',
            inline: true
        }).addFields({
            name: "Message owner: ",
            value: `${message.author.username}${message.author.discriminator === '0' ? '' : "#" + message.author.discriminator} (${message.author.id})`
        });
        if (eventType === 'updated') {
            embed.addFields({
                name: "Old message content",
                value: message.content.length > 0 ? message.content : '*Textual message content is empty*'
            }).addFields({
                name: "New message content",
                value: message.reactions.message.content.length > 0 ? message.reactions.message.content : '*Textual message content is empty*'
            });
        } else if (eventType === 'deleted') {
            embed.addFields({
                name: "Deleted message content",
                value: message.content.length > 0 ? message.content : '*Textual message content is empty*'
            });
        }
        if (attachmentsSize > 0) {
            embed.addFields({
                name: "Attachments: ",
                value: String(attachmentsSize)
            });
        }
        if (executor) {
            embed.addFields({
                name: "Executor (username): ",
                value: `${executor.username}`
            });
        }
        embed.setTimestamp();
        return embed;
    }
};
export function generateSearchEmbedMessage(response) {
    const embed = new EmbedBuilder().setColor(0x0099ff).setTitle(`Search Results`);
    if (response && response.results.length > 0) {
        for(let i = 0; i < response.results.length; i++){
            const r = response.results[i];
            embed.addFields({
                name: `[${r.url}](${r.url})`,
                value: `${r.description})`
            });
        }
    }
    embed.setTimestamp();
    return embed;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxhdWRpdC1sb2dcXGV2ZW50c1xcdXRpbGl0aWVzXFxtZXNzYWdlLXRlbXBsYXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVtYmVkQnVpbGRlciB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2VuZXJhdGVFbWJlZE1lc3NhZ2U6IChtZXNzYWdlLCBldmVudFR5cGUsIGF0dGFjaG1lbnRzU2l6ZSwgZXhlY3V0b3IpID0+IHtcclxuXHJcbiAgICBjb25zdCBjaGFubmVsID0gbWVzc2FnZS5ndWlsZC5jaGFubmVscy5jYWNoZS5maW5kKChjaCkgPT4gY2guaWQgPT09IG1lc3NhZ2UuY2hhbm5lbElkKTtcclxuICAgIGxldCBldmVudDtcclxuICAgIHN3aXRjaCAoZXZlbnRUeXBlKSB7XHJcbiAgICAgIGNhc2UgJ3VwZGF0ZWQnOlxyXG4gICAgICAgIGV2ZW50ID0gJ1VQREFURSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2RlbGV0ZWQnOlxyXG4gICAgICAgIGV2ZW50ID0gJ0RFTEVURSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZW1iZWQgPSBuZXcgRW1iZWRCdWlsZGVyKClcclxuICAgIC5zZXRDb2xvcigweDAwOTlmZilcclxuICAgIC5hZGRGaWVsZHMoXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiBgTWVzc2FnZSAke2V2ZW50VHlwZX0gaW4gYSBjaGFubmVsIDwjJHtjaGFubmVsLmlkfT5gLFxyXG4gICAgICAgIHZhbHVlOiAnXFx1MjAwQicsXHJcbiAgICAgICAgaW5saW5lOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICApXHJcbiAgICAuYWRkRmllbGRzKFxyXG4gICAgICB7XHJcbiAgICAgICAgbmFtZTogXCJNZXNzYWdlIG93bmVyOiBcIixcclxuICAgICAgICB2YWx1ZTogYCR7bWVzc2FnZS5hdXRob3IudXNlcm5hbWV9JHttZXNzYWdlLmF1dGhvci5kaXNjcmltaW5hdG9yID09PSAnMCcgPyAnJyA6IFwiI1wiK21lc3NhZ2UuYXV0aG9yLmRpc2NyaW1pbmF0b3J9ICgke21lc3NhZ2UuYXV0aG9yLmlkfSlgXHJcbiAgICAgICAgLy8gdmFsdWU6IGA8IyR7bWVzc2FnZS5hdXRob3IudXNlcm5hbWV9PmAgLy8gQ3VycmVudGx5IGRvZXNuJ3Qgd29yayBkdWUgdG8gZGlzY29yZCBpc3N1ZXNcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgaWYgKGV2ZW50VHlwZSA9PT0gJ3VwZGF0ZWQnKSB7XHJcbiAgICAgIGVtYmVkLmFkZEZpZWxkcyhcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiBcIk9sZCBtZXNzYWdlIGNvbnRlbnRcIixcclxuICAgICAgICAgIHZhbHVlOiBtZXNzYWdlLmNvbnRlbnQubGVuZ3RoID4gMCA/IG1lc3NhZ2UuY29udGVudCA6ICcqVGV4dHVhbCBtZXNzYWdlIGNvbnRlbnQgaXMgZW1wdHkqJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgIClcclxuICAgICAgLmFkZEZpZWxkcyhcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiBcIk5ldyBtZXNzYWdlIGNvbnRlbnRcIixcclxuICAgICAgICAgIHZhbHVlOiBtZXNzYWdlLnJlYWN0aW9ucy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoID4gMCA/IG1lc3NhZ2UucmVhY3Rpb25zLm1lc3NhZ2UuY29udGVudCA6ICcqVGV4dHVhbCBtZXNzYWdlIGNvbnRlbnQgaXMgZW1wdHkqJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgIClcclxuICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlID09PSAnZGVsZXRlZCcpIHtcclxuICAgICAgZW1iZWQuYWRkRmllbGRzKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6IFwiRGVsZXRlZCBtZXNzYWdlIGNvbnRlbnRcIixcclxuICAgICAgICAgIHZhbHVlOiBtZXNzYWdlLmNvbnRlbnQubGVuZ3RoID4gMCA/IG1lc3NhZ2UuY29udGVudCA6ICcqVGV4dHVhbCBtZXNzYWdlIGNvbnRlbnQgaXMgZW1wdHkqJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYXR0YWNobWVudHNTaXplID4gMCkge1xyXG4gICAgICBlbWJlZC5hZGRGaWVsZHMoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogXCJBdHRhY2htZW50czogXCIsXHJcbiAgICAgICAgICB2YWx1ZTogU3RyaW5nKGF0dGFjaG1lbnRzU2l6ZSlcclxuICAgICAgICB9LFxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV4ZWN1dG9yKSB7XHJcbiAgICAgIGVtYmVkLmFkZEZpZWxkcyhcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiBcIkV4ZWN1dG9yICh1c2VybmFtZSk6IFwiLFxyXG4gICAgICAgICAgdmFsdWU6IGAke2V4ZWN1dG9yLnVzZXJuYW1lfWBcclxuICAgICAgICB9LFxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGVtYmVkLnNldFRpbWVzdGFtcCgpO1xyXG4gICAgcmV0dXJuIGVtYmVkO1xyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVTZWFyY2hFbWJlZE1lc3NhZ2UgKHJlc3BvbnNlKSB7XHJcblxyXG4gIGNvbnN0IGVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpXHJcbiAgLnNldENvbG9yKDB4MDA5OWZmKVxyXG4gIC5zZXRUaXRsZShgU2VhcmNoIFJlc3VsdHNgKTtcclxuXHJcbiAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnJlc3VsdHMubGVuZ3RoID4gMCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwb25zZS5yZXN1bHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHIgPSByZXNwb25zZS5yZXN1bHRzW2ldO1xyXG4gICAgICBlbWJlZC5hZGRGaWVsZHMoe1xyXG4gICAgICAgIG5hbWU6IGBbJHtyLnVybH1dKCR7ci51cmx9KWAsXHJcbiAgICAgICAgdmFsdWU6IGAke3IuZGVzY3JpcHRpb259KWBcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVtYmVkLnNldFRpbWVzdGFtcCgpO1xyXG4gIHJldHVybiBlbWJlZDtcclxufSJdLCJuYW1lcyI6WyJFbWJlZEJ1aWxkZXIiLCJnZW5lcmF0ZUVtYmVkTWVzc2FnZSIsIm1lc3NhZ2UiLCJldmVudFR5cGUiLCJhdHRhY2htZW50c1NpemUiLCJleGVjdXRvciIsImNoYW5uZWwiLCJndWlsZCIsImNoYW5uZWxzIiwiY2FjaGUiLCJmaW5kIiwiY2giLCJpZCIsImNoYW5uZWxJZCIsImV2ZW50IiwiZW1iZWQiLCJzZXRDb2xvciIsImFkZEZpZWxkcyIsIm5hbWUiLCJ2YWx1ZSIsImlubGluZSIsImF1dGhvciIsInVzZXJuYW1lIiwiZGlzY3JpbWluYXRvciIsImNvbnRlbnQiLCJsZW5ndGgiLCJyZWFjdGlvbnMiLCJTdHJpbmciLCJzZXRUaW1lc3RhbXAiLCJnZW5lcmF0ZVNlYXJjaEVtYmVkTWVzc2FnZSIsInJlc3BvbnNlIiwic2V0VGl0bGUiLCJyZXN1bHRzIiwiaSIsInIiLCJ1cmwiLCJkZXNjcmlwdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsWUFBWSxRQUFRLGFBQWE7QUFFMUMsZUFBZTtJQUNiQyxzQkFBc0IsQ0FBQ0MsU0FBU0MsV0FBV0MsaUJBQWlCQztRQUUxRCxNQUFNQyxVQUFVSixRQUFRSyxLQUFLLENBQUNDLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDQyxJQUFJLENBQUMsQ0FBQ0MsS0FBT0EsR0FBR0MsRUFBRSxLQUFLVixRQUFRVyxTQUFTO1FBQ3JGLElBQUlDO1FBQ0osT0FBUVg7WUFDTixLQUFLO2dCQUNIVyxRQUFRO2dCQUNSO1lBQ0YsS0FBSztnQkFDSEEsUUFBUTtnQkFDUjtRQUNKO1FBRUEsTUFBTUMsUUFBUSxJQUFJZixlQUNqQmdCLFFBQVEsQ0FBQyxVQUNUQyxTQUFTLENBQ1I7WUFDRUMsTUFBTSxDQUFDLFFBQVEsRUFBRWYsVUFBVSxnQkFBZ0IsRUFBRUcsUUFBUU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxRE8sT0FBTztZQUNQQyxRQUFRO1FBQ1YsR0FFREgsU0FBUyxDQUNSO1lBQ0VDLE1BQU07WUFDTkMsT0FBTyxDQUFDLEVBQUVqQixRQUFRbUIsTUFBTSxDQUFDQyxRQUFRLENBQUMsRUFBRXBCLFFBQVFtQixNQUFNLENBQUNFLGFBQWEsS0FBSyxNQUFNLEtBQUssTUFBSXJCLFFBQVFtQixNQUFNLENBQUNFLGFBQWEsQ0FBQyxFQUFFLEVBQUVyQixRQUFRbUIsTUFBTSxDQUFDVCxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTNJO1FBR0YsSUFBSVQsY0FBYyxXQUFXO1lBQzNCWSxNQUFNRSxTQUFTLENBQ2I7Z0JBQ0VDLE1BQU07Z0JBQ05DLE9BQU9qQixRQUFRc0IsT0FBTyxDQUFDQyxNQUFNLEdBQUcsSUFBSXZCLFFBQVFzQixPQUFPLEdBQUc7WUFDeEQsR0FFRFAsU0FBUyxDQUNSO2dCQUNFQyxNQUFNO2dCQUNOQyxPQUFPakIsUUFBUXdCLFNBQVMsQ0FBQ3hCLE9BQU8sQ0FBQ3NCLE9BQU8sQ0FBQ0MsTUFBTSxHQUFHLElBQUl2QixRQUFRd0IsU0FBUyxDQUFDeEIsT0FBTyxDQUFDc0IsT0FBTyxHQUFHO1lBQzVGO1FBRUosT0FBTyxJQUFJckIsY0FBYyxXQUFXO1lBQ2xDWSxNQUFNRSxTQUFTLENBQ2I7Z0JBQ0VDLE1BQU07Z0JBQ05DLE9BQU9qQixRQUFRc0IsT0FBTyxDQUFDQyxNQUFNLEdBQUcsSUFBSXZCLFFBQVFzQixPQUFPLEdBQUc7WUFDeEQ7UUFFSjtRQUVBLElBQUlwQixrQkFBa0IsR0FBRztZQUN2QlcsTUFBTUUsU0FBUyxDQUNiO2dCQUNFQyxNQUFNO2dCQUNOQyxPQUFPUSxPQUFPdkI7WUFDaEI7UUFFSjtRQUVBLElBQUlDLFVBQVU7WUFDWlUsTUFBTUUsU0FBUyxDQUNiO2dCQUNFQyxNQUFNO2dCQUNOQyxPQUFPLENBQUMsRUFBRWQsU0FBU2lCLFFBQVEsQ0FBQyxDQUFDO1lBQy9CO1FBRUo7UUFHQVAsTUFBTWEsWUFBWTtRQUNsQixPQUFPYjtJQUNUO0FBQ0YsRUFBRTtBQUVGLE9BQU8sU0FBU2MsMkJBQTRCQyxRQUFRO0lBRWxELE1BQU1mLFFBQVEsSUFBSWYsZUFDakJnQixRQUFRLENBQUMsVUFDVGUsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDO0lBRTFCLElBQUlELFlBQVlBLFNBQVNFLE9BQU8sQ0FBQ1AsTUFBTSxHQUFHLEdBQUc7UUFDM0MsSUFBSyxJQUFJUSxJQUFJLEdBQUdBLElBQUlILFNBQVNFLE9BQU8sQ0FBQ1AsTUFBTSxFQUFFUSxJQUFLO1lBQ2hELE1BQU1DLElBQUlKLFNBQVNFLE9BQU8sQ0FBQ0MsRUFBRTtZQUM3QmxCLE1BQU1FLFNBQVMsQ0FBQztnQkFDZEMsTUFBTSxDQUFDLENBQUMsRUFBRWdCLEVBQUVDLEdBQUcsQ0FBQyxFQUFFLEVBQUVELEVBQUVDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCaEIsT0FBTyxDQUFDLEVBQUVlLEVBQUVFLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDNUI7UUFDRjtJQUNGO0lBRUFyQixNQUFNYSxZQUFZO0lBQ2xCLE9BQU9iO0FBQ1QifQ==