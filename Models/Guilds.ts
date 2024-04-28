import mongoose from 'mongoose';
import { channels, prefix } from '../Utils/Misc/Settings.json';

const guildSchema = new mongoose.Schema({
  id: String,
  prefix: { 'type': String, 'default': prefix },
  CHANNEL_MEMBER_COMING: { 'type': String, 'default': `${channels.join.id}` },
  CHANNEL_MEMBER_LEAVING: { 'type': String, 'default': `${channels.leave.id}` },
})

export default mongoose.model('Guild', guildSchema);
