const mongoose = require('mongoose');
const Schema = new mongoose.Schema;
const profileSchema = Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'Contact'
  },
  profileId: { type: Schema.Types.ObjectId },
  genId: {
    type: Number,
    unique: true,
  },
  to_person: {
    type: mongoose.Types.ObjectId,
    ref: 'Contact'
  },
  text_message: {
    type: String,
    default: '',
  },
  text_status: {
    type: String,
    default: 'show',
  },

}, { timestamps: true });

// MessageSchema.plugin(autoIncrement.plugin, {
//   model: 'Message',
//   field: 'genId',
//   startAt: 1,
//   incrementBy: 1
// })
profileSchema.index({ profile_id: 100 }, { background: true, name: 'profile_id_index', startingFrom: 100, incrementBy: 10 });
const PROFILE = mongoose.model('profile', profileSchema);
module.exports = PROFILE;


