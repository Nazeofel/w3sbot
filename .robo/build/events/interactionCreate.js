import { Flashcore } from "robo.js";
export default (async (interaction)=>{
    console.log(interaction);
    if (interaction.isModalSubmit()) {
        const i = interaction;
        if (i.customId === 'custom_message') {
            try {
                const channelID = await Flashcore.get('message_channel_id');
                const fields = i.fields.fields;
                const channel = i.guild.channels.cache.get(channelID);
                const msg = fields.get('message').value;
                channel.send({
                    content: msg
                });
                i.reply({
                    content: 'Message sent',
                    ephemeral: true
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcZXZlbnRzXFxpbnRlcmFjdGlvbkNyZWF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGbGFzaGNvcmUgfSBmcm9tICdyb2JvLmpzJztcclxuaW1wb3J0IHsgTW9kYWxTdWJtaXRJbnRlcmFjdGlvbiwgVGV4dENoYW5uZWwgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChpbnRlcmFjdGlvbjogYW55KSA9PiB7XHJcbiAgY29uc29sZS5sb2coaW50ZXJhY3Rpb24pXHJcbiAgICAgIGlmIChpbnRlcmFjdGlvbi5pc01vZGFsU3VibWl0KCkpIHtcclxuICAgICAgICBjb25zdCBpID0gaW50ZXJhY3Rpb24gYXMgTW9kYWxTdWJtaXRJbnRlcmFjdGlvbjtcclxuICAgICAgICBpZiAoaS5jdXN0b21JZCA9PT0gJ2N1c3RvbV9tZXNzYWdlJykge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgY2hhbm5lbElEID0gYXdhaXQgRmxhc2hjb3JlLmdldCgnbWVzc2FnZV9jaGFubmVsX2lkJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkcyA9IGkuZmllbGRzLmZpZWxkcyBhcyBhbnk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5uZWwgPSBpLmd1aWxkLmNoYW5uZWxzLmNhY2hlLmdldChjaGFubmVsSUQgYXMgc3RyaW5nKSBhcyBUZXh0Q2hhbm5lbDtcclxuICAgICAgICAgICAgY29uc3QgbXNnID0gZmllbGRzLmdldCgnbWVzc2FnZScpLnZhbHVlO1xyXG4gICAgICAgICAgICBjaGFubmVsLnNlbmQoe2NvbnRlbnQ6IG1zZ30pO1xyXG4gICAgICAgICAgICBpLnJlcGx5KHtjb250ZW50OiAnTWVzc2FnZSBzZW50JywgZXBoZW1lcmFsOiB0cnVlfSk7XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiRmxhc2hjb3JlIiwiaW50ZXJhY3Rpb24iLCJjb25zb2xlIiwibG9nIiwiaXNNb2RhbFN1Ym1pdCIsImkiLCJjdXN0b21JZCIsImNoYW5uZWxJRCIsImdldCIsImZpZWxkcyIsImNoYW5uZWwiLCJndWlsZCIsImNoYW5uZWxzIiwiY2FjaGUiLCJtc2ciLCJ2YWx1ZSIsInNlbmQiLCJjb250ZW50IiwicmVwbHkiLCJlcGhlbWVyYWwiLCJlcnJvciJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsU0FBUyxRQUFRLFVBQVU7QUFHcEMsZUFBZSxDQUFBLE9BQU9DO0lBQ3BCQyxRQUFRQyxHQUFHLENBQUNGO0lBQ1IsSUFBSUEsWUFBWUcsYUFBYSxJQUFJO1FBQy9CLE1BQU1DLElBQUlKO1FBQ1YsSUFBSUksRUFBRUMsUUFBUSxLQUFLLGtCQUFrQjtZQUNuQyxJQUFJO2dCQUNGLE1BQU1DLFlBQVksTUFBTVAsVUFBVVEsR0FBRyxDQUFDO2dCQUN0QyxNQUFNQyxTQUFTSixFQUFFSSxNQUFNLENBQUNBLE1BQU07Z0JBQzlCLE1BQU1DLFVBQVVMLEVBQUVNLEtBQUssQ0FBQ0MsUUFBUSxDQUFDQyxLQUFLLENBQUNMLEdBQUcsQ0FBQ0Q7Z0JBQzNDLE1BQU1PLE1BQU1MLE9BQU9ELEdBQUcsQ0FBQyxXQUFXTyxLQUFLO2dCQUN2Q0wsUUFBUU0sSUFBSSxDQUFDO29CQUFDQyxTQUFTSDtnQkFBRztnQkFDMUJULEVBQUVhLEtBQUssQ0FBQztvQkFBQ0QsU0FBUztvQkFBZ0JFLFdBQVc7Z0JBQUk7WUFDbkQsRUFBRSxPQUFPQyxPQUFPO2dCQUNkbEIsUUFBUUMsR0FBRyxDQUFDaUI7WUFDZDtRQUNGO0lBQ0Y7QUFDTixDQUFBLEVBQUMifQ==