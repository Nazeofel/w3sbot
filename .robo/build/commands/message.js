import { Flashcore } from "@roboplay/robo.js";
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
export const config = {
    description: 'Send a message to a channel',
    options: [
        {
            name: 'message_channel',
            description: 'Channel to send a message to',
            type: 'channel',
            required: true
        }
    ]
};
export const messageModal = async ()=>{
    const modal = new ModalBuilder().setCustomId('custom_message').setTitle('Send a message to a channel');
    const content = new TextInputBuilder().setCustomId('message').setLabel("Message content").setStyle(TextInputStyle.Paragraph).setRequired(true).setPlaceholder('Your message content here! It supports discord markdown!').setMinLength(1).setMaxLength(4000);
    const firstActionRow = new ActionRowBuilder().addComponents(content);
    modal.addComponents(firstActionRow);
    return {
        modal: modal
    };
};
export default (async (interaction)=>{
    const channel = interaction.options.getChannel('message_channel');
    if (channel && channel.isTextBased()) {
        await Flashcore.set('message_channel_id', channel.id);
        const modal = await messageModal();
        await interaction.showModal(modal.modal);
    } else {
        return {
            content: `Invalid channel provided`,
            ephemeral: true
        };
    }
    try {} catch (error) {
        console.log(error);
    }
});
