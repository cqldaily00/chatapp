const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  from_person: {
    type: mongoose.Types.ObjectId,
    ref: 'Contact'
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

const MessagePersons = mongoose.model('MessagePersons', MessageSchema);
module.exports = MessagePersons;


