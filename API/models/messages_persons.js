const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

// autoIncrement.initialize(mongoose.connection);

const MessageSchema = new mongoose.Schema({
  from_person: {
    type: mongoose.Types.ObjectId,
    ref: 'Contact'
  },

  to_person: {
    type: mongoose.Types.ObjectId,
    ref: 'Contact',
    set: function(value) {
      this.text_status = value; // Set text_status to 'show' when to_person is updated
      return value;
    }
  },
  text_message: {
    type: String,
    default: '',
  },
  text_status: {
    type: String,
    default: '',
  },

}, { timestamps: true });


const MessagePersons = mongoose.model('MessagePersons', MessageSchema);
module.exports = MessagePersons;


