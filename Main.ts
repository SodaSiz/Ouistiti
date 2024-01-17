import {Client, Collection} from 'discord.js';
import 'dotenv/config';
import ClientCustom from './types';

const client: ClientCustom = new Client({intents: 3276799}) as ClientCustom;

client.commands = new Collection();

const loadHandlers = async () => {
  const handlers = ["Commands", "Events"];
  await Promise.all(handlers.map(handler => import(`./Utils/Handlers/${handler}`).then(module => module.default(client))));
};

client.commands = new Collection();

process.on('exit', code => {console.log(`Le processus s'est arrêté avec le code ${code}`)});
process.on('uncaughtException', (err, origin) => {console.log(`UNCAUGHT_EXCEPTION: ERROR:\n${err}\n\nORIGIN:\n${origin}`)});
process.on('unhandledRejection', (promise, reason) => {console.log(`UNHANDLED_REJECTION: REASON: \n${reason}\n\nPROMISE:\n${promise}`)});
process.on('warning', (...args) => console.log('WARNING:\n', ...args))

loadHandlers().then(() => client.login(process.env.TOKEN));
