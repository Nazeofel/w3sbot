import { portal } from "robo.js";
import fs from "fs";
/**
 * @type {import('robo.js').Config}
 **/ const updateModulesStatus = ()=>{
    const jsonString = fs.readFileSync('./modules.json', 'utf8');
    const json = JSON.parse(jsonString);
    console.log(json);
    const modules = json.modules;
    try {
        for(let i = 0; i < modules.length; i++){
            portal.module(modules[i].name).setEnabled(modules[i].isEnabled);
        }
    } catch (error) {
        throw error;
    }
};
export default (async ()=>{
    console.log(process.env.NODE_ENV);
    try {
        updateModulesStatus();
    } catch (error) {
        console.log(error);
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcZXZlbnRzXFxfc3RhcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcG9ydGFsIH0gZnJvbSAncm9iby5qcyc7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcblxyXG4vKipcclxuICogQHR5cGUge2ltcG9ydCgncm9iby5qcycpLkNvbmZpZ31cclxuICoqL1xyXG5jb25zdCB1cGRhdGVNb2R1bGVzU3RhdHVzID0gKCkgPT4ge1xyXG4gIGNvbnN0IGpzb25TdHJpbmcgPSBmcy5yZWFkRmlsZVN5bmMoJy4vbW9kdWxlcy5qc29uJywgJ3V0ZjgnKTtcclxuICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShqc29uU3RyaW5nKTtcclxuICBjb25zb2xlLmxvZyhqc29uKVxyXG4gIGNvbnN0IG1vZHVsZXMgPSBqc29uLm1vZHVsZXM7XHJcbiAgdHJ5IHtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHBvcnRhbC5tb2R1bGUobW9kdWxlc1tpXS5uYW1lKS5zZXRFbmFibGVkKG1vZHVsZXNbaV0uaXNFbmFibGVkKVxyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICB0aHJvdyhlcnJvcilcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jICgpID0+IHtcclxuICBjb25zb2xlLmxvZyhwcm9jZXNzLmVudi5OT0RFX0VOVilcclxuICB0cnkge1xyXG4gICAgdXBkYXRlTW9kdWxlc1N0YXR1cygpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbInBvcnRhbCIsImZzIiwidXBkYXRlTW9kdWxlc1N0YXR1cyIsImpzb25TdHJpbmciLCJyZWFkRmlsZVN5bmMiLCJqc29uIiwiSlNPTiIsInBhcnNlIiwiY29uc29sZSIsImxvZyIsIm1vZHVsZXMiLCJpIiwibGVuZ3RoIiwibW9kdWxlIiwibmFtZSIsInNldEVuYWJsZWQiLCJpc0VuYWJsZWQiLCJlcnJvciIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsTUFBTSxRQUFRLFVBQVU7QUFDakMsT0FBT0MsUUFBUSxLQUFLO0FBRXBCOztFQUVFLEdBQ0YsTUFBTUMsc0JBQXNCO0lBQzFCLE1BQU1DLGFBQWFGLEdBQUdHLFlBQVksQ0FBQyxrQkFBa0I7SUFDckQsTUFBTUMsT0FBT0MsS0FBS0MsS0FBSyxDQUFDSjtJQUN4QkssUUFBUUMsR0FBRyxDQUFDSjtJQUNaLE1BQU1LLFVBQVVMLEtBQUtLLE9BQU87SUFDNUIsSUFBSTtRQUNGLElBQUksSUFBSUMsSUFBSSxHQUFHQSxJQUFJRCxRQUFRRSxNQUFNLEVBQUVELElBQUs7WUFDdENYLE9BQU9hLE1BQU0sQ0FBQ0gsT0FBTyxDQUFDQyxFQUFFLENBQUNHLElBQUksRUFBRUMsVUFBVSxDQUFDTCxPQUFPLENBQUNDLEVBQUUsQ0FBQ0ssU0FBUztRQUNoRTtJQUNGLEVBQUUsT0FBT0MsT0FBTztRQUNkLE1BQU1BO0lBQ1I7QUFDRjtBQUVBLGVBQWUsQ0FBQTtJQUNiVCxRQUFRQyxHQUFHLENBQUNTLFFBQVFDLEdBQUcsQ0FBQ0MsUUFBUTtJQUNoQyxJQUFJO1FBQ0ZsQjtJQUNGLEVBQUUsT0FBT2UsT0FBTztRQUNkVCxRQUFRQyxHQUFHLENBQUNRO0lBQ2Q7QUFDRixDQUFBLEVBQUMifQ==