import { Flashcore } from "robo.js";
export default (async (interaction)=>{
    console.log(interaction);
    if (interaction.isModalSubmit()) {
        const i = interaction;
        if (i.customId === 'custom_message') {
            try {
                const channelID = await Flashcore.get('message_channel_id');
                const fields = i.fields.fields;
                const channel = i.guild.channels.cache.get(channelID);
                const msg = fields.get('message').value;
                channel.send({
                    content: msg
                });
                i.reply({
                    content: 'Message sent',
                    ephemeral: true
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
});
