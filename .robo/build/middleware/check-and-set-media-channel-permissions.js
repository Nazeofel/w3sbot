export default async function(data) {
    const [interaction] = data.payload;
    const { key, module, type } = data.record;
    if (interaction && type === 'event' && key === 'messageCreate' && data.record) {
        interaction['record'] = data.record;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcbWlkZGxld2FyZVxcY2hlY2stYW5kLXNldC1tZWRpYS1jaGFubmVsLXBlcm1pc3Npb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgY29uc3QgW2ludGVyYWN0aW9uXSA9IGRhdGEucGF5bG9hZFxyXG4gIGNvbnN0IHsga2V5LCBtb2R1bGUsIHR5cGUgfSA9IGRhdGEucmVjb3JkXHJcblxyXG4gIGlmKGludGVyYWN0aW9uICYmIHR5cGUgPT09ICdldmVudCcgJiYga2V5ID09PSAnbWVzc2FnZUNyZWF0ZScgJiYgZGF0YS5yZWNvcmQpIHtcclxuICAgIGludGVyYWN0aW9uWydyZWNvcmQnXSA9IGRhdGEucmVjb3JkO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiZGF0YSIsImludGVyYWN0aW9uIiwicGF5bG9hZCIsImtleSIsIm1vZHVsZSIsInR5cGUiLCJyZWNvcmQiXSwibWFwcGluZ3MiOiJBQUFBLGVBQWUsZUFBZ0JBLElBQUk7SUFDakMsTUFBTSxDQUFDQyxZQUFZLEdBQUdELEtBQUtFLE9BQU87SUFDbEMsTUFBTSxFQUFFQyxHQUFHLEVBQUVDLE1BQU0sRUFBRUMsSUFBSSxFQUFFLEdBQUdMLEtBQUtNLE1BQU07SUFFekMsSUFBR0wsZUFBZUksU0FBUyxXQUFXRixRQUFRLG1CQUFtQkgsS0FBS00sTUFBTSxFQUFFO1FBQzVFTCxXQUFXLENBQUMsU0FBUyxHQUFHRCxLQUFLTSxNQUFNO0lBQ3JDO0FBQ0YifQ==