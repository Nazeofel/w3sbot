export const config = {
    description: 'Delete bulk of messages in a channel',
    options: [
        {
            name: 'channel',
            required: true,
            description: 'Choose a channel'
        },
        {
            name: 'number',
            required: true,
            description: 'Number of messages'
        }
    ]
};
export default (async (interaction)=>{
    try {
        const channelId = interaction.options._hoistedOptions[0].value.match(/\d+/)[0];
        const messagesNumber = interaction.options._hoistedOptions[1].value.match(/\d+/)[0];
        const channel = interaction.guild.channels.cache.get(channelId);
        return channel.bulkDelete(Number(messagesNumber)).then(()=>{
            channel.send('Messages deleted successfully');
        }).cache((error)=>{
            channel.send(JSON.stringify(error));
        });
    } catch (error) {
        console.log(error);
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcbW9kdWxlc1xcYnVsa2RlbGV0ZVxcYnVsa2RlbGV0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kQ29uZmlnIH0gZnJvbSBcInJvYm8uanNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBjb25maWc6IENvbW1hbmRDb25maWcgPSB7XHJcbiAgZGVzY3JpcHRpb246ICdEZWxldGUgYnVsayBvZiBtZXNzYWdlcyBpbiBhIGNoYW5uZWwnLFxyXG4gIG9wdGlvbnM6IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2NoYW5uZWwnLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgZGVzY3JpcHRpb246ICdDaG9vc2UgYSBjaGFubmVsJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ251bWJlcicsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ051bWJlciBvZiBtZXNzYWdlcydcclxuICAgIH1cclxuICBdXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChpbnRlcmFjdGlvbikgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBjaGFubmVsSWQgPSBpbnRlcmFjdGlvbi5vcHRpb25zLl9ob2lzdGVkT3B0aW9uc1swXS52YWx1ZS5tYXRjaCgvXFxkKy8pWzBdO1xyXG4gICAgY29uc3QgbWVzc2FnZXNOdW1iZXIgPSBpbnRlcmFjdGlvbi5vcHRpb25zLl9ob2lzdGVkT3B0aW9uc1sxXS52YWx1ZS5tYXRjaCgvXFxkKy8pWzBdO1xyXG5cclxuICAgIGNvbnN0IGNoYW5uZWwgPSBpbnRlcmFjdGlvbi5ndWlsZC5jaGFubmVscy5jYWNoZS5nZXQoY2hhbm5lbElkKTtcclxuICAgIHJldHVybiBjaGFubmVsLmJ1bGtEZWxldGUoTnVtYmVyKG1lc3NhZ2VzTnVtYmVyKSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGNoYW5uZWwuc2VuZCgnTWVzc2FnZXMgZGVsZXRlZCBzdWNjZXNzZnVsbHknKVxyXG4gICAgICB9KS5jYWNoZSgoZXJyb3IpID0+IHtcclxuICAgICAgICBjaGFubmVsLnNlbmQoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKVxyXG4gICAgICB9KVxyXG5cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJjb25maWciLCJkZXNjcmlwdGlvbiIsIm9wdGlvbnMiLCJuYW1lIiwicmVxdWlyZWQiLCJpbnRlcmFjdGlvbiIsImNoYW5uZWxJZCIsIl9ob2lzdGVkT3B0aW9ucyIsInZhbHVlIiwibWF0Y2giLCJtZXNzYWdlc051bWJlciIsImNoYW5uZWwiLCJndWlsZCIsImNoYW5uZWxzIiwiY2FjaGUiLCJnZXQiLCJidWxrRGVsZXRlIiwiTnVtYmVyIiwidGhlbiIsInNlbmQiLCJlcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLE1BQU1BLFNBQXdCO0lBQ25DQyxhQUFhO0lBQ2JDLFNBQVM7UUFDUDtZQUNFQyxNQUFNO1lBQ05DLFVBQVU7WUFDVkgsYUFBYTtRQUNmO1FBQ0E7WUFDRUUsTUFBTTtZQUNOQyxVQUFVO1lBQ1ZILGFBQWE7UUFDZjtLQUNEO0FBQ0gsRUFBQztBQUVELGVBQWUsQ0FBQSxPQUFPSTtJQUNwQixJQUFJO1FBQ0YsTUFBTUMsWUFBWUQsWUFBWUgsT0FBTyxDQUFDSyxlQUFlLENBQUMsRUFBRSxDQUFDQyxLQUFLLENBQUNDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUM5RSxNQUFNQyxpQkFBaUJMLFlBQVlILE9BQU8sQ0FBQ0ssZUFBZSxDQUFDLEVBQUUsQ0FBQ0MsS0FBSyxDQUFDQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFFbkYsTUFBTUUsVUFBVU4sWUFBWU8sS0FBSyxDQUFDQyxRQUFRLENBQUNDLEtBQUssQ0FBQ0MsR0FBRyxDQUFDVDtRQUNyRCxPQUFPSyxRQUFRSyxVQUFVLENBQUNDLE9BQU9QLGlCQUM5QlEsSUFBSSxDQUFDO1lBQ0pQLFFBQVFRLElBQUksQ0FBQztRQUNmLEdBQUdMLEtBQUssQ0FBQyxDQUFDTTtZQUNSVCxRQUFRUSxJQUFJLENBQUNFLEtBQUtDLFNBQVMsQ0FBQ0Y7UUFDOUI7SUFFSixFQUFFLE9BQU9BLE9BQU87UUFDZEcsUUFBUUMsR0FBRyxDQUFDSjtJQUNkO0FBQ0YsQ0FBQSxFQUFDIn0=