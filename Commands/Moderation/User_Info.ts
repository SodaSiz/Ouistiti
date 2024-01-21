import { ContextMenuInteraction, MessageEmbed, Permissions } from 'discord.js';
import { embed_var } from '../../Utils/Misc/Settings.json';
import dayjs from 'dayjs';
import ClientCustom from '../../types';

export default {
  name: 'userinfo',
  type: 'USER',
  async runInteraction(client: ClientCustom, interaction: ContextMenuInteraction) {
    // Vérification que interaction.guild n'est pas null
    // Créez votre embed avec les informations du membre
    const guild = client.guilds.cache.get(interaction.guildId as string);

    if (!guild) return;

    const member = await guild.members.fetch(interaction.targetId);

    let memberPermissions = '';
    switch (true) {
      case member.permissions.has(Permissions.FLAGS.ADMINISTRATOR):
        memberPermissions = 'Administrateur';
        break;
      case member.permissions.has(Permissions.FLAGS.KICK_MEMBERS):
        memberPermissions = 'Modérateur';
        break;
      // Ajoutez d'autres cases pour les permissions supplémentaires si nécessaire
      default:
        memberPermissions = 'Membre';
        break;
    }


    const embed = new MessageEmbed()
      .setTitle('Informations sur l\'utilisateur')
      .setAuthor({
        name: `${member.user.username} (${member.id})`, iconURL: member.user.bot
          ? 'https://media.discordapp.net/attachments/1145202552707752015/1198663315350622218/build-you-basic-discord-bot.jpg?ex=65bfb934&is=65ad4434&hm=55e092be8dccaa37e74377cddfb32a1eddabb2832718c2ba5ad384cfaa6110fb&'
          : 'https://media.discordapp.net/attachments/1145202552707752015/1198663021933904003/1f9d1.png?ex=65bfb8ee&is=65ad43ee&hm=d5842aa82323ce426b1764ee9452d7ff7cdd09139eea7ecc7a582563a3d41a97&'
      })

      .setImage(member.user.displayAvatarURL())
      .addFields
      (
        {
          name: "Nom d'utilisateur",
          value: member.displayName,
          inline: true
        },
        {
          name: "Modérateur",
          value: memberPermissions,
          inline: true
        },
        {
          name: "Type de membre",
          value: member.user.bot ? 'Bot' : 'Utilisateur',
          inline: true
        },
        {
          name: "Rôles",
          value: `${member.roles.cache.map(role => role).join(' / ')}`
        }, {
        name: "・Compte crée le",
        value: `<t:${dayjs(member.user.createdAt).unix()}> (<t:${dayjs(member.user.createdAt).unix()}:R>)`,
        inline: true
      }, {
        name: "・Rejoint le serveur le",
        value: `<t:${dayjs(member.joinedTimestamp).unix()}> (<t:${dayjs(member.joinedTimestamp).unix()}:R>)`,
        inline: true
      },
      )
      // Ajoutez d'autres champs selon vos besoins
      .setColor(`#${embed_var.color}`);

    // Répondre avec l'embed
    await interaction.reply({ embeds: [embed] });
  }
}
