import { restartExistingCronInstances } from "../modules/quotes/utils/utils.js";
export default (async (event)=>{
    try {
        await restartExistingCronInstances(event);
    } catch (error) {
        console.log(error);
    }
});
