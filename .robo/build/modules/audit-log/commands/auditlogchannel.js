import "dotenv/config";
import dbService from "../../../db/service/index.js";
export const config = {
    description: 'Sets a channel for audit logs',
    options: [
        {
            name: 'channel',
            required: true,
            description: 'Set a channel where audit logs will be stored'
        }
    ]
};
export default (async (event)=>{
    const channelId = event.options._hoistedOptions[0].value.match(/\d+/)[0];
    const channelName = event.guild.channels.cache.get(channelId).name;
    try {
        const request = await dbService.setAuditLogChannel({
            channelName: channelName,
            channelId: channelId
        });
        if (request.code && request.code === 200) {
            return `Audit log channel set - <#${channelId}>`;
        }
        return `Audit channel could not be set.`;
    } catch (e) {
        console.log(e);
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxhdWRpdC1sb2dcXGNvbW1hbmRzXFxhdWRpdGxvZ2NoYW5uZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdkb3RlbnYvY29uZmlnJ1xyXG5pbXBvcnQgdHlwZSB7IENvbW1hbmRDb25maWcgfSBmcm9tICdAcm9ib3BsYXkvcm9iby5qcydcclxuaW1wb3J0IGRiU2VydmljZSBmcm9tICcuLi8uLi8uLi9kYi9zZXJ2aWNlL2luZGV4LmpzJztcclxuXHJcbmV4cG9ydCBjb25zdCBjb25maWc6IENvbW1hbmRDb25maWcgPSB7XHJcbiAgZGVzY3JpcHRpb246ICdTZXRzIGEgY2hhbm5lbCBmb3IgYXVkaXQgbG9ncycsXHJcbiAgb3B0aW9uczogW1xyXG4gICAge1xyXG4gICAgICBuYW1lOiAnY2hhbm5lbCcsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ1NldCBhIGNoYW5uZWwgd2hlcmUgYXVkaXQgbG9ncyB3aWxsIGJlIHN0b3JlZCdcclxuICAgIH1cclxuICBdXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChldmVudCkgPT4ge1xyXG4gIGNvbnN0IGNoYW5uZWxJZCA9IGV2ZW50Lm9wdGlvbnMuX2hvaXN0ZWRPcHRpb25zWzBdLnZhbHVlLm1hdGNoKC9cXGQrLylbMF07XHJcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBldmVudC5ndWlsZC5jaGFubmVscy5jYWNoZS5nZXQoY2hhbm5lbElkKS5uYW1lO1xyXG5cclxuXHR0cnkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGRiU2VydmljZS5zZXRBdWRpdExvZ0NoYW5uZWwoe1xyXG4gICAgICBjaGFubmVsTmFtZTogY2hhbm5lbE5hbWUsXHJcbiAgICAgIGNoYW5uZWxJZDogY2hhbm5lbElkXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgaWYgKHJlcXVlc3QuY29kZSAmJiByZXF1ZXN0LmNvZGUgPT09IDIwMCkge1xyXG4gICAgICByZXR1cm4gYEF1ZGl0IGxvZyBjaGFubmVsIHNldCAtIDwjJHtjaGFubmVsSWR9PmAgICAgICAgXHJcbiAgICB9IFxyXG5cclxuICAgIHJldHVybiBgQXVkaXQgY2hhbm5lbCBjb3VsZCBub3QgYmUgc2V0LmAgICBcclxuXHR9IGNhdGNoKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgfVxyXG59Il0sIm5hbWVzIjpbImRiU2VydmljZSIsImNvbmZpZyIsImRlc2NyaXB0aW9uIiwib3B0aW9ucyIsIm5hbWUiLCJyZXF1aXJlZCIsImV2ZW50IiwiY2hhbm5lbElkIiwiX2hvaXN0ZWRPcHRpb25zIiwidmFsdWUiLCJtYXRjaCIsImNoYW5uZWxOYW1lIiwiZ3VpbGQiLCJjaGFubmVscyIsImNhY2hlIiwiZ2V0IiwicmVxdWVzdCIsInNldEF1ZGl0TG9nQ2hhbm5lbCIsImNvZGUiLCJlIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxnQkFBZTtBQUV0QixPQUFPQSxlQUFlLCtCQUErQjtBQUVyRCxPQUFPLE1BQU1DLFNBQXdCO0lBQ25DQyxhQUFhO0lBQ2JDLFNBQVM7UUFDUDtZQUNFQyxNQUFNO1lBQ05DLFVBQVU7WUFDVkgsYUFBYTtRQUNmO0tBQ0Q7QUFDSCxFQUFDO0FBRUQsZUFBZSxDQUFBLE9BQU9JO0lBQ3BCLE1BQU1DLFlBQVlELE1BQU1ILE9BQU8sQ0FBQ0ssZUFBZSxDQUFDLEVBQUUsQ0FBQ0MsS0FBSyxDQUFDQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFDeEUsTUFBTUMsY0FBY0wsTUFBTU0sS0FBSyxDQUFDQyxRQUFRLENBQUNDLEtBQUssQ0FBQ0MsR0FBRyxDQUFDUixXQUFXSCxJQUFJO0lBRW5FLElBQUk7UUFDRCxNQUFNWSxVQUFVLE1BQU1oQixVQUFVaUIsa0JBQWtCLENBQUM7WUFDakROLGFBQWFBO1lBQ2JKLFdBQVdBO1FBQ2I7UUFFQSxJQUFJUyxRQUFRRSxJQUFJLElBQUlGLFFBQVFFLElBQUksS0FBSyxLQUFLO1lBQ3hDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRVgsVUFBVSxDQUFDLENBQUM7UUFDbEQ7UUFFQSxPQUFPLENBQUMsK0JBQStCLENBQUM7SUFDM0MsRUFBRSxPQUFNWSxHQUFHO1FBQ1JDLFFBQVFDLEdBQUcsQ0FBQ0Y7SUFDZDtBQUNGLENBQUEsRUFBQyJ9