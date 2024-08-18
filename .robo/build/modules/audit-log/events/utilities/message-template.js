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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcbW9kdWxlc1xcYXVkaXQtbG9nXFxldmVudHNcXHV0aWxpdGllc1xcbWVzc2FnZS10ZW1wbGF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbWJlZEJ1aWxkZXIgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdlbmVyYXRlRW1iZWRNZXNzYWdlOiAobWVzc2FnZSwgZXZlbnRUeXBlLCBhdHRhY2htZW50c1NpemUsIGV4ZWN1dG9yKSA9PiB7XHJcblxyXG4gICAgY29uc3QgY2hhbm5lbCA9IG1lc3NhZ2UuZ3VpbGQuY2hhbm5lbHMuY2FjaGUuZmluZCgoY2gpID0+IGNoLmlkID09PSBtZXNzYWdlLmNoYW5uZWxJZCk7XHJcbiAgICBsZXQgZXZlbnQ7XHJcbiAgICBzd2l0Y2ggKGV2ZW50VHlwZSkge1xyXG4gICAgICBjYXNlICd1cGRhdGVkJzpcclxuICAgICAgICBldmVudCA9ICdVUERBVEUnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdkZWxldGVkJzpcclxuICAgICAgICBldmVudCA9ICdERUxFVEUnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpXHJcbiAgICAuc2V0Q29sb3IoMHgwMDk5ZmYpXHJcbiAgICAuYWRkRmllbGRzKFxyXG4gICAgICB7XHJcbiAgICAgICAgbmFtZTogYE1lc3NhZ2UgJHtldmVudFR5cGV9IGluIGEgY2hhbm5lbCA8IyR7Y2hhbm5lbC5pZH0+YCxcclxuICAgICAgICB2YWx1ZTogJ1xcdTIwMEInLFxyXG4gICAgICAgIGlubGluZTogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgKVxyXG4gICAgLmFkZEZpZWxkcyhcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6IFwiTWVzc2FnZSBvd25lcjogXCIsXHJcbiAgICAgICAgdmFsdWU6IGAke21lc3NhZ2UuYXV0aG9yLnVzZXJuYW1lfSR7bWVzc2FnZS5hdXRob3IuZGlzY3JpbWluYXRvciA9PT0gJzAnID8gJycgOiBcIiNcIittZXNzYWdlLmF1dGhvci5kaXNjcmltaW5hdG9yfSAoJHttZXNzYWdlLmF1dGhvci5pZH0pYFxyXG4gICAgICAgIC8vIHZhbHVlOiBgPCMke21lc3NhZ2UuYXV0aG9yLnVzZXJuYW1lfT5gIC8vIEN1cnJlbnRseSBkb2Vzbid0IHdvcmsgZHVlIHRvIGRpc2NvcmQgaXNzdWVzXHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChldmVudFR5cGUgPT09ICd1cGRhdGVkJykge1xyXG4gICAgICBlbWJlZC5hZGRGaWVsZHMoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogXCJPbGQgbWVzc2FnZSBjb250ZW50XCIsXHJcbiAgICAgICAgICB2YWx1ZTogbWVzc2FnZS5jb250ZW50Lmxlbmd0aCA+IDAgPyBtZXNzYWdlLmNvbnRlbnQgOiAnKlRleHR1YWwgbWVzc2FnZSBjb250ZW50IGlzIGVtcHR5KidcclxuICAgICAgICB9LFxyXG4gICAgICApXHJcbiAgICAgIC5hZGRGaWVsZHMoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogXCJOZXcgbWVzc2FnZSBjb250ZW50XCIsXHJcbiAgICAgICAgICB2YWx1ZTogbWVzc2FnZS5yZWFjdGlvbnMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCA+IDAgPyBtZXNzYWdlLnJlYWN0aW9ucy5tZXNzYWdlLmNvbnRlbnQgOiAnKlRleHR1YWwgbWVzc2FnZSBjb250ZW50IGlzIGVtcHR5KidcclxuICAgICAgICB9LFxyXG4gICAgICApXHJcbiAgICB9IGVsc2UgaWYgKGV2ZW50VHlwZSA9PT0gJ2RlbGV0ZWQnKSB7XHJcbiAgICAgIGVtYmVkLmFkZEZpZWxkcyhcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiBcIkRlbGV0ZWQgbWVzc2FnZSBjb250ZW50XCIsXHJcbiAgICAgICAgICB2YWx1ZTogbWVzc2FnZS5jb250ZW50Lmxlbmd0aCA+IDAgPyBtZXNzYWdlLmNvbnRlbnQgOiAnKlRleHR1YWwgbWVzc2FnZSBjb250ZW50IGlzIGVtcHR5KidcclxuICAgICAgICB9LFxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGF0dGFjaG1lbnRzU2l6ZSA+IDApIHtcclxuICAgICAgZW1iZWQuYWRkRmllbGRzKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6IFwiQXR0YWNobWVudHM6IFwiLFxyXG4gICAgICAgICAgdmFsdWU6IFN0cmluZyhhdHRhY2htZW50c1NpemUpXHJcbiAgICAgICAgfSxcclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChleGVjdXRvcikge1xyXG4gICAgICBlbWJlZC5hZGRGaWVsZHMoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogXCJFeGVjdXRvciAodXNlcm5hbWUpOiBcIixcclxuICAgICAgICAgIHZhbHVlOiBgJHtleGVjdXRvci51c2VybmFtZX1gXHJcbiAgICAgICAgfSxcclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBlbWJlZC5zZXRUaW1lc3RhbXAoKTtcclxuICAgIHJldHVybiBlbWJlZDtcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU2VhcmNoRW1iZWRNZXNzYWdlIChyZXNwb25zZSkge1xyXG5cclxuICBjb25zdCBlbWJlZCA9IG5ldyBFbWJlZEJ1aWxkZXIoKVxyXG4gIC5zZXRDb2xvcigweDAwOTlmZilcclxuICAuc2V0VGl0bGUoYFNlYXJjaCBSZXN1bHRzYCk7XHJcblxyXG4gIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5yZXN1bHRzLmxlbmd0aCA+IDApIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzcG9uc2UucmVzdWx0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCByID0gcmVzcG9uc2UucmVzdWx0c1tpXTtcclxuICAgICAgZW1iZWQuYWRkRmllbGRzKHtcclxuICAgICAgICBuYW1lOiBgWyR7ci51cmx9XSgke3IudXJsfSlgLFxyXG4gICAgICAgIHZhbHVlOiBgJHtyLmRlc2NyaXB0aW9ufSlgXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbWJlZC5zZXRUaW1lc3RhbXAoKTtcclxuICByZXR1cm4gZW1iZWQ7XHJcbn0iXSwibmFtZXMiOlsiRW1iZWRCdWlsZGVyIiwiZ2VuZXJhdGVFbWJlZE1lc3NhZ2UiLCJtZXNzYWdlIiwiZXZlbnRUeXBlIiwiYXR0YWNobWVudHNTaXplIiwiZXhlY3V0b3IiLCJjaGFubmVsIiwiZ3VpbGQiLCJjaGFubmVscyIsImNhY2hlIiwiZmluZCIsImNoIiwiaWQiLCJjaGFubmVsSWQiLCJldmVudCIsImVtYmVkIiwic2V0Q29sb3IiLCJhZGRGaWVsZHMiLCJuYW1lIiwidmFsdWUiLCJpbmxpbmUiLCJhdXRob3IiLCJ1c2VybmFtZSIsImRpc2NyaW1pbmF0b3IiLCJjb250ZW50IiwibGVuZ3RoIiwicmVhY3Rpb25zIiwiU3RyaW5nIiwic2V0VGltZXN0YW1wIiwiZ2VuZXJhdGVTZWFyY2hFbWJlZE1lc3NhZ2UiLCJyZXNwb25zZSIsInNldFRpdGxlIiwicmVzdWx0cyIsImkiLCJyIiwidXJsIiwiZGVzY3JpcHRpb24iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLFlBQVksUUFBUSxhQUFhO0FBRTFDLGVBQWU7SUFDYkMsc0JBQXNCLENBQUNDLFNBQVNDLFdBQVdDLGlCQUFpQkM7UUFFMUQsTUFBTUMsVUFBVUosUUFBUUssS0FBSyxDQUFDQyxRQUFRLENBQUNDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLENBQUNDLEtBQU9BLEdBQUdDLEVBQUUsS0FBS1YsUUFBUVcsU0FBUztRQUNyRixJQUFJQztRQUNKLE9BQVFYO1lBQ04sS0FBSztnQkFDSFcsUUFBUTtnQkFDUjtZQUNGLEtB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