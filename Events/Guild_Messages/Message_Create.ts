import {prefix} from '../../Utils/Misc/Settings.json';
import ClientCustom from '../../types';
import {Message} from 'discord.js';

export default {
  name: 'messageCreate',
  once: false,
  execute(client: ClientCustom, message: Message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmdName = args.shift()?.toLowerCase();
    if (!cmdName) return;

    const cmd = client.commands.get(cmdName);

    if (cmd) cmd.run(client, message, args);
  }
}
