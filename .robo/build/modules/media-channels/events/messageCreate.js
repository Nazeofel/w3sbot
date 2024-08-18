export default (async (message)=>{
// const mediaChannelData = JSON.parse(await Flashcore.get('media-channel', {
//   namespace: message.guildId!
// }));
// if(mediaChannelData && mediaChannelData.channelId === message.channelId) {
//     const mediaChannel = message.member.guild.channels.cache.get(mediaChannelData.channelId);
//     try {
//       if (mediaChannel.isTextBased() && !message.author.bot) {
//         const fetchedMessage = await mediaChannel.messages.fetch(message.id);
//           //895226128376160296 - prod role
//           //1112030309588943016 - dev role
//           if (message.member.roles.cache.has('895226128376160296')) {
//             return;
//           }
//         if (message.attachments.size > 0) {
//           console.log(message.attachments)
//           const files = Array.from(message.attachments.values())
//           .filter((attachment) => allowedMediaTypes.includes(attachment.contentType))
//           .map((attachment) => attachment.url);
//           await fetchedMessage.delete();
//           if (files && files.length > 0 || message.member.roles.cache.some) {
//             await mediaChannel.send({content: `Posted by @${message.author.username}${message.author.discriminator !== '0' ?
//             `#${message.author.discriminator}` : ''}`, files: files})
//           }
//         } else {
//           await fetchedMessage.delete();
//         }
//       }
//   } catch (error) {
//     console.log('media-channels -> messageCreate.ts -> catch(error): ')
//     console.log(error)
//   }
// }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcbW9kdWxlc1xcbWVkaWEtY2hhbm5lbHNcXGV2ZW50c1xcbWVzc2FnZUNyZWF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcydcclxuaW1wb3J0IHsgYWxsb3dlZE1lZGlhVHlwZXMgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9jb25maWcuanMnO1xyXG5pbXBvcnQgeyBGbGFzaGNvcmUgfSBmcm9tICdyb2JvLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XHJcbiAgLy8gY29uc3QgbWVkaWFDaGFubmVsRGF0YSA9IEpTT04ucGFyc2UoYXdhaXQgRmxhc2hjb3JlLmdldCgnbWVkaWEtY2hhbm5lbCcsIHtcclxuICAvLyAgIG5hbWVzcGFjZTogbWVzc2FnZS5ndWlsZElkIVxyXG4gIC8vIH0pKTtcclxuXHJcbiAgLy8gaWYobWVkaWFDaGFubmVsRGF0YSAmJiBtZWRpYUNoYW5uZWxEYXRhLmNoYW5uZWxJZCA9PT0gbWVzc2FnZS5jaGFubmVsSWQpIHtcclxuICAvLyAgICAgY29uc3QgbWVkaWFDaGFubmVsID0gbWVzc2FnZS5tZW1iZXIuZ3VpbGQuY2hhbm5lbHMuY2FjaGUuZ2V0KG1lZGlhQ2hhbm5lbERhdGEuY2hhbm5lbElkKTtcclxuICAvLyAgICAgdHJ5IHtcclxuICAvLyAgICAgICBpZiAobWVkaWFDaGFubmVsLmlzVGV4dEJhc2VkKCkgJiYgIW1lc3NhZ2UuYXV0aG9yLmJvdCkge1xyXG4gIC8vICAgICAgICAgY29uc3QgZmV0Y2hlZE1lc3NhZ2UgPSBhd2FpdCBtZWRpYUNoYW5uZWwubWVzc2FnZXMuZmV0Y2gobWVzc2FnZS5pZCk7XHJcbiAgLy8gICAgICAgICAgIC8vODk1MjI2MTI4Mzc2MTYwMjk2IC0gcHJvZCByb2xlXHJcbiAgLy8gICAgICAgICAgIC8vMTExMjAzMDMwOTU4ODk0MzAxNiAtIGRldiByb2xlXHJcbiAgLy8gICAgICAgICAgIGlmIChtZXNzYWdlLm1lbWJlci5yb2xlcy5jYWNoZS5oYXMoJzg5NTIyNjEyODM3NjE2MDI5NicpKSB7XHJcbiAgLy8gICAgICAgICAgICAgcmV0dXJuO1xyXG4gIC8vICAgICAgICAgICB9XHJcbiAgLy8gICAgICAgICBpZiAobWVzc2FnZS5hdHRhY2htZW50cy5zaXplID4gMCkge1xyXG4gIC8vICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLmF0dGFjaG1lbnRzKVxyXG4gIC8vICAgICAgICAgICBjb25zdCBmaWxlcyA9IEFycmF5LmZyb20obWVzc2FnZS5hdHRhY2htZW50cy52YWx1ZXMoKSlcclxuICAvLyAgICAgICAgICAgLmZpbHRlcigoYXR0YWNobWVudCkgPT4gYWxsb3dlZE1lZGlhVHlwZXMuaW5jbHVkZXMoYXR0YWNobWVudC5jb250ZW50VHlwZSkpXHJcbiAgLy8gICAgICAgICAgIC5tYXAoKGF0dGFjaG1lbnQpID0+IGF0dGFjaG1lbnQudXJsKTtcclxuICAvLyAgICAgICAgICAgYXdhaXQgZmV0Y2hlZE1lc3NhZ2UuZGVsZXRlKCk7XHJcbiAgLy8gICAgICAgICAgIGlmIChmaWxlcyAmJiBmaWxlcy5sZW5ndGggPiAwIHx8IG1lc3NhZ2UubWVtYmVyLnJvbGVzLmNhY2hlLnNvbWUpIHtcclxuICAvLyAgICAgICAgICAgICBhd2FpdCBtZWRpYUNoYW5uZWwuc2VuZCh7Y29udGVudDogYFBvc3RlZCBieSBAJHttZXNzYWdlLmF1dGhvci51c2VybmFtZX0ke21lc3NhZ2UuYXV0aG9yLmRpc2NyaW1pbmF0b3IgIT09ICcwJyA/XHJcbiAgLy8gICAgICAgICAgICAgYCMke21lc3NhZ2UuYXV0aG9yLmRpc2NyaW1pbmF0b3J9YCA6ICcnfWAsIGZpbGVzOiBmaWxlc30pXHJcbiAgLy8gICAgICAgICAgIH1cclxuICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgLy8gICAgICAgICAgIGF3YWl0IGZldGNoZWRNZXNzYWdlLmRlbGV0ZSgpO1xyXG4gIC8vICAgICAgICAgfVxyXG4gIC8vICAgICAgIH1cclxuICAvLyAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKCdtZWRpYS1jaGFubmVscyAtPiBtZXNzYWdlQ3JlYXRlLnRzIC0+IGNhdGNoKGVycm9yKTogJylcclxuICAvLyAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiQUFJQSxlQUFlLENBQUEsT0FBT0E7QUFDcEIsNkVBQTZFO0FBQzdFLGdDQUFnQztBQUNoQyxPQUFPO0FBRVAsNkVBQTZFO0FBQzdFLGdHQUFnRztBQUNoRyxZQUFZO0FBQ1osaUVBQWlFO0FBQ2pFLGdGQUFnRjtBQUNoRiw2Q0FBNkM7QUFDN0MsNkNBQTZDO0FBQzdDLHdFQUF3RTtBQUN4RSxzQkFBc0I7QUFDdEIsY0FBYztBQUNkLDhDQUE4QztBQUM5Qyw2Q0FBNkM7QUFDN0MsbUVBQW1FO0FBQ25FLHdGQUF3RjtBQUN4RixrREFBa0Q7QUFDbEQsMkNBQTJDO0FBQzNDLGdGQUFnRjtBQUNoRiwrSEFBK0g7QUFDL0gsd0VBQXdFO0FBQ3hFLGNBQWM7QUFDZCxtQkFBbUI7QUFDbkIsMkNBQTJDO0FBQzNDLFlBQVk7QUFDWixVQUFVO0FBQ1Ysc0JBQXNCO0FBQ3RCLDBFQUEwRTtBQUMxRSx5QkFBeUI7QUFDekIsTUFBTTtBQUNOLElBQUk7QUFDTixDQUFBLEVBQUMifQ==