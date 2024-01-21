import { CommandInteraction, ContextMenuInteraction } from 'discord.js';
import ClientCustom from '../../types';

export default {
  name: 'interactionCreate',
  once: false,
  async execute(client: ClientCustom, interaction: CommandInteraction) {
    if (interaction.isCommand() || (interaction as ContextMenuInteraction).isContextMenu()) {
      const cmd = client.commands.get(interaction.commandName);
      if (!cmd || (!cmd.description && cmd.type != 'USER')) return interaction.reply("Cette commande n'existe pas.");
      cmd.runInteraction(client, interaction);
    }
  }
};
