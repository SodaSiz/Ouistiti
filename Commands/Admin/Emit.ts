import { Message, CommandInteraction, MessageEmbed } from 'discord.js';
import ClientCustom from '../../types';

export default {
  name: 'emit',
  description: 'Emetre un événement au choix.',
  run: (client: ClientCustom, message: Message, args: String[]) => {
    if (!args[0] || !["guildMemberAdd", "guildCreate", "guildMemberRemove"].includes(args[0] as string))
      return message.reply("Merci d'entrer un événement valide");

    if (args[0] === 'guildCreate')
      client.emit(args[0] as string, message.member);
    else
      client.emit(args[0] as string, message.guild)
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
        },
        {
          name: 'guildCreate',
          value: 'guildCreate'
        }
      ]
    }
  ],

  runInteraction: (client: ClientCustom, interaction: CommandInteraction) => {
    const evtChoices = interaction.options.getString('event');

    if (evtChoices === 'guildCreate')
      client.emit(evtChoices as string, interaction.guild);
    else
      client.emit(evtChoices as string, interaction.member);
    interaction.reply({ content: `Événement ${evtChoices} émit` });
  }
}
