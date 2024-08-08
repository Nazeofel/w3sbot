import { EmbedBuilder } from "discord.js";
export function generateEmbedMessage(modules) {
    const embed = new EmbedBuilder().setColor(0x0099ff);
    for(let i = 0; i < modules.length; i++){
        const module = modules[i];
        embed.addFields({
            name: `${module.moduleName} is ${module.isEnabled ? 'enabled' : 'disabled'}`,
            value: '\u200B'
        });
    }
    embed.setTimestamp();
    return embed;
}
