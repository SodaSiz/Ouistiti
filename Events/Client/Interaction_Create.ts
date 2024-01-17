import {CommandInteraction} from 'discord.js';
import ClientCustom from '../../types';

export default {
  name: 'interactionCreate',
  once: false,
  async execute(client: ClientCustom, interaction: CommandInteraction) {
    if (interaction.isCommand()) {
      const cmd = client.commands.get(interaction.commandName);
      if (!cmd) return interaction.reply("Cette command n'existe pas.");
      cmd.runSlash(client, interaction);
    }
  }
}
