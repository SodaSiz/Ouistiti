import ClientCustom from '../../types';
import { Guild } from '../../Models/Index';
import { MessageEmbed, AnonymousGuild } from 'discord.js';

export default {
  name: 'guildCreate',
  once: false,
  async execute(client: ClientCustom, guild: AnonymousGuild) {
    console.log(Guild);

    // Créer une instance du modèle Guild
    const guildInstance = await new Guild({ id: guild.id });

    // Enregistrer l'instance dans la base de données
    guildInstance.save().then((g) => console.log(`Nouveau serveur (${g.id})`));
  }
};
