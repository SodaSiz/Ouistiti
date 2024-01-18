import {Message, CommandInteraction, MessageEmbed} from 'discord.js';
import ClientCustom from '../../types';
import {embed_var} from '../../Utils/Misc/Settings.json';

export default {
  name: 'emit',
  description: 'Emetre un événement au choix.',
  run: (client: ClientCustom, message: Message, args: String[]) => {
    if (!args[0] || !["guildMemberAdd", "guildMemberRemove"].includes(args[0] as string))
      return message.reply("Merci d'entrer un événement valide");

    client.emit(args[0] as string, message.member);
    message.reply(`Événement ${args[0]} émit`)

  },
  options: [
    {
      name: 'event',
      description: 'Choisir un événement à emettre',
      type: 'STRING',
      required: true,
      choices: [
        {
          name: 'guildMemberAdd',
          value: 'guildMemberAdd'
        },
        {
          name: 'guildMemberRemove',
          value: 'guildMemberRemove'
        }
      ]
    }
  ],

  runSlash: (client: ClientCustom, interaction: CommandInteraction) => {
    const evtChoices = interaction.options.getString('event');

    client.emit(evtChoices ? evtChoices : '', interaction.member);
    interaction.reply({content: `Événement ${evtChoices} émit`});
  }
}
