import "dotenv/config";
import { portal } from "@roboplay/robo.js";
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
