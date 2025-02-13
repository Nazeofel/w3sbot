import { CommandConfig } from "robo.js";

export const config: CommandConfig = {
  description: 'Delete bulk of messages in a channel',
  options: [
    {
      name: 'channel',
      required: true,
      description: 'Choose a channel'
    },
    {
      name: 'number',
      required: true,
      description: 'Number of messages'
    }
  ]
}

export default async (interaction) => {
  try {
    const channelId = interaction.options._hoistedOptions[0].value.match(/\d+/)[0];
    const messagesNumber = interaction.options._hoistedOptions[1].value.match(/\d+/)[0];

    const channel = interaction.guild.channels.cache.get(channelId);
    return channel.bulkDelete(Number(messagesNumber))
      .then(() => {
        channel.send('Messages delfeted successfully')
      }).cache((error) => {
        channel.send(JSON.stringify(error))
      })

  } catch (error) {
    console.log(error)
  }
}
