import {Message} from 'discord.js';
import ClientCustom from '../../types';

export default {
  name: 'ping',
  run: (client: ClientCustom, message: Message, args: String[]) => {
    message.reply('test');
  }
}
