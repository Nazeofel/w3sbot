export default (async (message)=>{
    try {
        console.log('global events -> messageCreate');
        // console.log(message);
        console.log(message.attachments);
        console.log(message.content.length);
        console.log(message.groupActivityApplication);
        if (message.attachments && message.attachments.size === 0 && message.content.length === 0 && message.groupActivityApplication == null) {
            console.log('Message is a poll'); // Log if all conditions are met
        }
    } catch (error) {
        console.log(error);
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcZXZlbnRzXFxtZXNzYWdlQ3JlYXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFzeW5jIChtZXNzYWdlOiBhbnkpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc29sZS5sb2coJ2dsb2JhbCBldmVudHMgLT4gbWVzc2FnZUNyZWF0ZScpXHJcbiAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UuYXR0YWNobWVudHMpXHJcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlLmNvbnRlbnQubGVuZ3RoKVxyXG4gICAgY29uc29sZS5sb2cobWVzc2FnZS5ncm91cEFjdGl2aXR5QXBwbGljYXRpb24pXHJcbiAgICBpZiAoXHJcbiAgICAgIChtZXNzYWdlLmF0dGFjaG1lbnRzICYmIG1lc3NhZ2UuYXR0YWNobWVudHMuc2l6ZSA9PT0gMCkgJiZcclxuICAgICAgbWVzc2FnZS5jb250ZW50Lmxlbmd0aCA9PT0gMCAmJlxyXG4gICAgICBtZXNzYWdlLmdyb3VwQWN0aXZpdHlBcHBsaWNhdGlvbiA9PSBudWxsXHJcbiAgICApIHtcclxuICAgICAgY29uc29sZS5sb2coJ01lc3NhZ2UgaXMgYSBwb2xsJyk7IC8vIExvZyBpZiBhbGwgY29uZGl0aW9ucyBhcmUgbWV0XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsibWVzc2FnZSIsImNvbnNvbGUiLCJsb2ciLCJhdHRhY2htZW50cyIsImNvbnRlbnQiLCJsZW5ndGgiLCJncm91cEFjdGl2aXR5QXBwbGljYXRpb24iLCJzaXplIiwiZXJyb3IiXSwibWFwcGluZ3MiOiJBQUFBLGVBQWUsQ0FBQSxPQUFPQTtJQUNwQixJQUFJO1FBQ0ZDLFFBQVFDLEdBQUcsQ0FBQztRQUNaLHdCQUF3QjtRQUN4QkQsUUFBUUMsR0FBRyxDQUFDRixRQUFRRyxXQUFXO1FBQy9CRixRQUFRQyxHQUFHLENBQUNGLFFBQVFJLE9BQU8sQ0FBQ0MsTUFBTTtRQUNsQ0osUUFBUUMsR0FBRyxDQUFDRixRQUFRTSx3QkFBd0I7UUFDNUMsSUFDRSxBQUFDTixRQUFRRyxXQUFXLElBQUlILFFBQVFHLFdBQVcsQ0FBQ0ksSUFBSSxLQUFLLEtBQ3JEUCxRQUFRSSxPQUFPLENBQUNDLE1BQU0sS0FBSyxLQUMzQkwsUUFBUU0sd0JBQXdCLElBQUksTUFDcEM7WUFDQUwsUUFBUUMsR0FBRyxDQUFDLHNCQUFzQixnQ0FBZ0M7UUFDcEU7SUFDRixFQUFFLE9BQU9NLE9BQU87UUFDZFAsUUFBUUMsR0FBRyxDQUFDTTtJQUNkO0FBQ0YsQ0FBQSxFQUFDIn0=