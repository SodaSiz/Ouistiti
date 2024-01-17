import {Client, Collection} from 'discord.js';
import ClientCustom from './types';
import {MongoDB_Options} from './Utils/Misc/Settings.json';
import mongoose from 'mongoose';
import 'dotenv/config';

const client: ClientCustom = new Client({intents: 3276799}) as ClientCustom;

client.commands = new Collection();

const loadHandlers = async () => {
  const handlers = ["Commands", "Events"];
  await Promise.all(handlers.map(async (handler) => {
    const module = await import(`./Utils/Handlers/${handler}`);
    module.default(client);
  }));
};

process.on('exit', (code) => {
  console.log(`Le processus s'est arrêté avec le code ${code}`);
});

process.on('uncaughtException', (err, origin) => {
  console.log(`UNCAUGHT_EXCEPTION: ERROR:\n${err}\n\nORIGIN:\n${origin}`);
});

process.on('unhandledRejection', (promise, reason) => {
  console.log(`UNHANDLED_REJECTION: REASON: \n${reason}\n\nPROMISE:\n${promise}`)
});

process.on('warning', (...args) => {
  console.log('WARNING:\n', ...args);
});

console.log(MongoDB_Options);

if (process.env.MONGODB_URI && MongoDB_Options) {
  mongoose.connect(process.env.MONGODB_URI, MongoDB_Options).then(() => {console.log('Le client est connecté à la base de donnée')}).catch(err => {console.log(err);});
} else {
  console.error('Vous devez mettre en place une base de donnée et renseigner l\'URI dans le fichier .env et renseignez vos parametres dans Utils/Misc/Settings.json');
  process.exit(1);
}

loadHandlers().then(() => client.login(process.env.TOKEN));
