import { Message, AttachmentBuilder, AuditLogEvent } from 'discord.js'
import dbService from '../../../db/service/index.js';
import messageUtil from './utilities/message-template.js';

export default async (message: Message) => {
  const auditLogs = await message.guild.fetchAuditLogs({
    type: AuditLogEvent.MessageDelete, 
    limit: 1
  })
  const firstEntry = auditLogs.entries.first();
  console.log('Message Update -> Executor -> ', firstEntry.executor.username)
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
        const auditChannelRequest = await dbService.getAuditLogChannel();
        if (auditChannelRequest && auditChannelRequest.code === 200 && auditChannelRequest.data) {
          const messageTemplate = messageUtil.generateEmbedMessage(message, 'updated', message.attachments.size, firstEntry.executor);
          const auditChannel = message.guild.channels.cache.get(auditChannelRequest.data.channelId);
    
          if(!auditChannel) {
            console.error(`Channel with id ${auditChannelRequest.data.channelId} not found`);
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
