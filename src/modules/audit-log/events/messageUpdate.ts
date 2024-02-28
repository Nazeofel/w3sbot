import { Message, AttachmentBuilder } from 'discord.js'
import messageUtil from './utilities/message-template.js';
import { Flashcore } from '@roboplay/robo.js';

export default async (message: Message) => {
  if(!message.author.bot) {
    try {
      const attachmentsArray = [];
      if(message.attachments.size > 0) {
        message.attachments.map(attachment => {
          const att = new AttachmentBuilder(attachment.url)
          attachmentsArray.push(att);
        })  
      } else {
        console.log('No attachments')
      }
      try {
        const auditLogChannelData = JSON.parse(await Flashcore.get('media-channel', {
          namespace: message.guildId!
        }));
        if (auditLogChannelData) {
          const messageTemplate = messageUtil.generateEmbedMessage(message, 'updated', message.attachments.size, null);
          const auditChannel = message.guild.channels.cache.get(auditLogChannelData.channelId);
    
          if(!auditChannel) {
            console.error(`Channel with id ${auditLogChannelData.channelId} not found`);
            return;
          }

          if(auditChannel.isTextBased()) {
            await auditChannel.send({embeds: [messageTemplate], files: attachmentsArray})
          }
        }
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
        console.log(error)
    }
  }
}
