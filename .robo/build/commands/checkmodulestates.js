import "dotenv/config";
import { portal } from "robo.js";
import { Modules } from "../types/types.js";
import { generateEmbedMessage } from "./utils/modules-message-template.js";
export const config = {
    description: 'Gets a list of all modules and their states'
};
export default (async (event)=>{
    try {
        const modules = [];
        for (const [key, value] of Object.entries(Modules)){
            modules.push({
                moduleName: key,
                isEnabled: portal.module(value).isEnabled
            });
        }
        const message = generateEmbedMessage(modules);
        return {
            embeds: [
                message
            ],
            ephemeral: true
        };
    } catch (error) {
        console.log(error);
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcY29tbWFuZHNcXGNoZWNrbW9kdWxlc3RhdGVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnZG90ZW52L2NvbmZpZydcclxuaW1wb3J0IHR5cGUgeyBDb21tYW5kQ29uZmlnIH0gZnJvbSAncm9iby5qcydcclxuaW1wb3J0IHsgcG9ydGFsIH0gZnJvbSAncm9iby5qcyc7XHJcbmltcG9ydCB7IE1vZHVsZXMsIFBvcnRhbE1vZHVsZSB9IGZyb20gJy4uL3R5cGVzL3R5cGVzLmpzJ1xyXG5pbXBvcnQge2dlbmVyYXRlRW1iZWRNZXNzYWdlfSBmcm9tICcuL3V0aWxzL21vZHVsZXMtbWVzc2FnZS10ZW1wbGF0ZS5qcyc7XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnOiBDb21tYW5kQ29uZmlnID0ge1xyXG4gIGRlc2NyaXB0aW9uOiAnR2V0cyBhIGxpc3Qgb2YgYWxsIG1vZHVsZXMgYW5kIHRoZWlyIHN0YXRlcydcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IG1vZHVsZXM6IFBvcnRhbE1vZHVsZVtdID0gW107XHJcblxyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoTW9kdWxlcykpIHtcclxuICAgICAgbW9kdWxlcy5wdXNoKHtcclxuICAgICAgICBtb2R1bGVOYW1lOiBrZXksXHJcbiAgICAgICAgaXNFbmFibGVkOiBwb3J0YWwubW9kdWxlKHZhbHVlKS5pc0VuYWJsZWRcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWVzc2FnZSA9IGdlbmVyYXRlRW1iZWRNZXNzYWdlKG1vZHVsZXMpO1xyXG4gICAgcmV0dXJuIHtlbWJlZHM6IFttZXNzYWdlXSwgZXBoZW1lcmFsOiB0cnVlfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICB9XHJcbn0iXSwibmFtZXMiOlsicG9ydGFsIiwiTW9kdWxlcyIsImdlbmVyYXRlRW1iZWRNZXNzYWdlIiwiY29uZmlnIiwiZGVzY3JpcHRpb24iLCJldmVudCIsIm1vZHVsZXMiLCJrZXkiLCJ2YWx1ZSIsIk9iamVjdCIsImVudHJpZXMiLCJwdXNoIiwibW9kdWxlTmFtZSIsImlzRW5hYmxlZCIsIm1vZHVsZSIsIm1lc3NhZ2UiLCJlbWJlZHMiLCJlcGhlbWVyYWwiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQWU7QUFFdEIsU0FBU0EsTUFBTSxRQUFRLFVBQVU7QUFDakMsU0FBU0MsT0FBTyxRQUFzQixvQkFBbUI7QUFDekQsU0FBUUMsb0JBQW9CLFFBQU8sc0NBQXNDO0FBRXpFLE9BQU8sTUFBTUMsU0FBd0I7SUFDbkNDLGFBQWE7QUFDZixFQUFDO0FBRUQsZUFBZSxDQUFBLE9BQU9DO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxVQUEwQixFQUFFO1FBRWxDLEtBQUssTUFBTSxDQUFDQyxLQUFLQyxNQUFNLElBQUlDLE9BQU9DLE9BQU8sQ0FBQ1QsU0FBVTtZQUNsREssUUFBUUssSUFBSSxDQUFDO2dCQUNYQyxZQUFZTDtnQkFDWk0sV0FBV2IsT0FBT2MsTUFBTSxDQUFDTixPQUFPSyxTQUFTO1lBQzNDO1FBQ0Y7UUFFQSxNQUFNRSxVQUFVYixxQkFBcUJJO1FBQ3JDLE9BQU87WUFBQ1UsUUFBUTtnQkFBQ0Q7YUFBUTtZQUFFRSxXQUFXO1FBQUk7SUFDNUMsRUFBRSxPQUFPQyxPQUFPO1FBQ2RDLFFBQVFDLEdBQUcsQ0FBQ0Y7SUFDZDtBQUNGLENBQUEsRUFBQyJ9