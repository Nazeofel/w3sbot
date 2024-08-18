import 'dotenv/config'
import type { CommandConfig } from 'robo.js'
import { portal } from 'robo.js';
import { Modules, PortalModule } from '../types/types.js'
import {generateEmbedMessage} from './utils/modules-message-template.js';

export const config: CommandConfig = {
  description: 'Gets a list of all modules and their states'
}

export default async (event) => {
  try {
    const modules: PortalModule[] = [];

    for (const [key, value] of Object.entries(Modules)) {
      modules.push({
        moduleName: key,
        isEnabled: portal.module(value).isEnabled
      });
    }

    const message = generateEmbedMessage(modules);
    return {embeds: [message], ephemeral: true}
  } catch (error) {
    console.log(error)
  }
}