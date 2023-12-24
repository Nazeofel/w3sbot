import { Flashcore } from "@roboplay/robo.js";
export default (async (interaction)=>{
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxldmVudHNcXGludGVyYWN0aW9uQ3JlYXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZsYXNoY29yZSB9IGZyb20gJ0Byb2JvcGxheS9yb2JvLmpzJztcclxuaW1wb3J0IHsgTW9kYWxTdWJtaXRJbnRlcmFjdGlvbiwgVGV4dENoYW5uZWwgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChpbnRlcmFjdGlvbjogYW55KSA9PiB7XHJcbiAgICAgIGlmIChpbnRlcmFjdGlvbi5pc01vZGFsU3VibWl0KCkpIHtcclxuICAgICAgICBjb25zdCBpID0gaW50ZXJhY3Rpb24gYXMgTW9kYWxTdWJtaXRJbnRlcmFjdGlvbjtcclxuICAgICAgICBpZiAoaS5jdXN0b21JZCA9PT0gJ2N1c3RvbV9tZXNzYWdlJykge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgY2hhbm5lbElEID0gYXdhaXQgRmxhc2hjb3JlLmdldCgnbWVzc2FnZV9jaGFubmVsX2lkJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkcyA9IGkuZmllbGRzLmZpZWxkcyBhcyBhbnk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5uZWwgPSBpLmd1aWxkLmNoYW5uZWxzLmNhY2hlLmdldChjaGFubmVsSUQgYXMgc3RyaW5nKSBhcyBUZXh0Q2hhbm5lbDtcclxuICAgICAgICAgICAgY29uc3QgbXNnID0gZmllbGRzLmdldCgnbWVzc2FnZScpLnZhbHVlO1xyXG4gICAgICAgICAgICBjaGFubmVsLnNlbmQoe2NvbnRlbnQ6IG1zZ30pO1xyXG4gICAgICAgICAgICBpLnJlcGx5KHtjb250ZW50OiAnTWVzc2FnZSBzZW50JywgZXBoZW1lcmFsOiB0cnVlfSk7XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiRmxhc2hjb3JlIiwiaW50ZXJhY3Rpb24iLCJpc01vZGFsU3VibWl0IiwiaSIsImN1c3RvbUlkIiwiY2hhbm5lbElEIiwiZ2V0IiwiZmllbGRzIiwiY2hhbm5lbCIsImd1aWxkIiwiY2hhbm5lbHMiLCJjYWNoZSIsIm1zZyIsInZhbHVlIiwic2VuZCIsImNvbnRlbnQiLCJyZXBseSIsImVwaGVtZXJhbCIsImVycm9yIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsU0FBUyxRQUFRLG9CQUFvQjtBQUc5QyxlQUFlLENBQUEsT0FBT0M7SUFDaEIsSUFBSUEsWUFBWUMsYUFBYSxJQUFJO1FBQy9CLE1BQU1DLElBQUlGO1FBQ1YsSUFBSUUsRUFBRUMsUUFBUSxLQUFLLGtCQUFrQjtZQUNuQyxJQUFJO2dCQUNGLE1BQU1DLFlBQVksTUFBTUwsVUFBVU0sR0FBRyxDQUFDO2dCQUN0QyxNQUFNQyxTQUFTSixFQUFFSSxNQUFNLENBQUNBLE1BQU07Z0JBQzlCLE1BQU1DLFVBQVVMLEVBQUVNLEtBQUssQ0FBQ0MsUUFBUSxDQUFDQyxLQUFLLENBQUNMLEdBQUcsQ0FBQ0Q7Z0JBQzNDLE1BQU1PLE1BQU1MLE9BQU9ELEdBQUcsQ0FBQyxXQUFXTyxLQUFLO2dCQUN2Q0wsUUFBUU0sSUFBSSxDQUFDO29CQUFDQyxTQUFTSDtnQkFBRztnQkFDMUJULEVBQUVhLEtBQUssQ0FBQztvQkFBQ0QsU0FBUztvQkFBZ0JFLFdBQVc7Z0JBQUk7WUFDbkQsRUFBRSxPQUFPQyxPQUFPO2dCQUNkQyxRQUFRQyxHQUFHLENBQUNGO1lBQ2Q7UUFDRjtJQUNGO0FBQ04sQ0FBQSxFQUFDIn0=