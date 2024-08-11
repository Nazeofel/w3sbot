import "dotenv/config";
import { portal } from "robo.js";
import { Modules } from "../types/types.js";
const moduleChoices = [];
for (const [key, value] of Object.entries(Modules)){
    moduleChoices.push({
        name: key,
        value: value
    });
}
export const config = {
    description: 'Sets enabled or disabled state of a module',
    options: [
        {
            name: 'module',
            required: true,
            description: 'Choose a module',
            choices: moduleChoices
        },
        {
            name: 'state',
            required: true,
            description: 'Set a state of a module',
            choices: [
                {
                    name: 'Enabled',
                    value: '1'
                },
                {
                    name: 'Disabled',
                    value: '0'
                }
            ]
        }
    ]
};
export default (async (event)=>{
    try {
        const module = event.options.get('module').value;
        const state = Boolean(Number(event.options.get('state').value));
        portal.module(module).setEnabled(state);
        if (state) {
            return `${module} is enabled.`;
        } else {
            return `${module} is disabled.`;
        }
    } catch (error) {
        console.log(error);
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcY29tbWFuZHNcXGNoYW5nZW1vZHVsZXN0YXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnZG90ZW52L2NvbmZpZydcclxuaW1wb3J0IHR5cGUgeyBDb21tYW5kQ29uZmlnIH0gZnJvbSAncm9iby5qcydcclxuaW1wb3J0IHsgcG9ydGFsIH0gZnJvbSAncm9iby5qcyc7XHJcbmltcG9ydCB7IE1vZHVsZXMgfSBmcm9tICcuLi90eXBlcy90eXBlcy5qcydcclxuXHJcbmNvbnN0IG1vZHVsZUNob2ljZXMgPSBbXTtcclxuZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoTW9kdWxlcykpIHtcclxuICBtb2R1bGVDaG9pY2VzLnB1c2goe1xyXG4gICAgbmFtZToga2V5LFxyXG4gICAgdmFsdWU6IHZhbHVlXHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjb25maWc6IENvbW1hbmRDb25maWcgPSB7XHJcbiAgZGVzY3JpcHRpb246ICdTZXRzIGVuYWJsZWQgb3IgZGlzYWJsZWQgc3RhdGUgb2YgYSBtb2R1bGUnLFxyXG4gIG9wdGlvbnM6IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ21vZHVsZScsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ0Nob29zZSBhIG1vZHVsZScsXHJcbiAgICAgIGNob2ljZXM6IG1vZHVsZUNob2ljZXNcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdzdGF0ZScsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ1NldCBhIHN0YXRlIG9mIGEgbW9kdWxlJyxcclxuICAgICAgY2hvaWNlczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdFbmFibGVkJyxcclxuICAgICAgICAgIHZhbHVlOiAnMScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiAnRGlzYWJsZWQnLFxyXG4gICAgICAgICAgdmFsdWU6ICcwJ1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF0sXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChldmVudCkgPT4ge1xyXG4gIHRyeSB7XHJcblxyXG4gICAgY29uc3QgbW9kdWxlID0gZXZlbnQub3B0aW9ucy5nZXQoJ21vZHVsZScpLnZhbHVlO1xyXG4gICAgY29uc3Qgc3RhdGUgPSBCb29sZWFuKE51bWJlcihldmVudC5vcHRpb25zLmdldCgnc3RhdGUnKS52YWx1ZSkpO1xyXG4gICAgcG9ydGFsLm1vZHVsZShtb2R1bGUpLnNldEVuYWJsZWQoc3RhdGUpO1xyXG4gICAgaWYgKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBgJHttb2R1bGV9IGlzIGVuYWJsZWQuYFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGAke21vZHVsZX0gaXMgZGlzYWJsZWQuYFxyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbInBvcnRhbCIsIk1vZHVsZXMiLCJtb2R1bGVDaG9pY2VzIiwia2V5IiwidmFsdWUiLCJPYmplY3QiLCJlbnRyaWVzIiwicHVzaCIsIm5hbWUiLCJjb25maWciLCJkZXNjcmlwdGlvbiIsIm9wdGlvbnMiLCJyZXF1aXJlZCIsImNob2ljZXMiLCJldmVudCIsIm1vZHVsZSIsImdldCIsInN0YXRlIiwiQm9vbGVhbiIsIk51bWJlciIsInNldEVuYWJsZWQiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQWU7QUFFdEIsU0FBU0EsTUFBTSxRQUFRLFVBQVU7QUFDakMsU0FBU0MsT0FBTyxRQUFRLG9CQUFtQjtBQUUzQyxNQUFNQyxnQkFBZ0IsRUFBRTtBQUN4QixLQUFLLE1BQU0sQ0FBQ0MsS0FBS0MsTUFBTSxJQUFJQyxPQUFPQyxPQUFPLENBQUNMLFNBQVU7SUFDbERDLGNBQWNLLElBQUksQ0FBQztRQUNqQkMsTUFBTUw7UUFDTkMsT0FBT0E7SUFDVDtBQUNGO0FBRUEsT0FBTyxNQUFNSyxTQUF3QjtJQUNuQ0MsYUFBYTtJQUNiQyxTQUFTO1FBQ1A7WUFDRUgsTUFBTTtZQUNOSSxVQUFVO1lBQ1ZGLGFBQWE7WUFDYkcsU0FBU1g7UUFDWDtRQUNBO1lBQ0VNLE1BQU07WUFDTkksVUFBVTtZQUNWRixhQUFhO1lBQ2JHLFNBQVM7Z0JBQ1A7b0JBQ0VMLE1BQU07b0JBQ05KLE9BQU87Z0JBQ1Q7Z0JBQ0E7b0JBQ0VJLE1BQU07b0JBQ05KLE9BQU87Z0JBQ1Q7YUFDRDtRQUNIO0tBQ0Q7QUFDSCxFQUFDO0FBRUQsZUFBZSxDQUFBLE9BQU9VO0lBQ3BCLElBQUk7UUFFRixNQUFNQyxTQUFTRCxNQUFNSCxPQUFPLENBQUNLLEdBQUcsQ0FBQyxVQUFVWixLQUFLO1FBQ2hELE1BQU1hLFFBQVFDLFFBQVFDLE9BQU9MLE1BQU1ILE9BQU8sQ0FBQ0ssR0FBRyxDQUFDLFNBQVNaLEtBQUs7UUFDN0RKLE9BQU9lLE1BQU0sQ0FBQ0EsUUFBUUssVUFBVSxDQUFDSDtRQUNqQyxJQUFJQSxPQUFPO1lBQ1QsT0FBTyxDQUFDLEVBQUVGLE9BQU8sWUFBWSxDQUFDO1FBQ2hDLE9BQU87WUFDTCxPQUFPLENBQUMsRUFBRUEsT0FBTyxhQUFhLENBQUM7UUFDakM7SUFDRixFQUFFLE9BQU9NLE9BQU87UUFDZEMsUUFBUUMsR0FBRyxDQUFDRjtJQUNkO0FBQ0YsQ0FBQSxFQUFDIn0=