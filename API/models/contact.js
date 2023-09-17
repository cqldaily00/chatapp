const mongoose = require('mongoose')


// Contact table:

// contact_id (Primary Key)
// name
// contact
// joined_date
// account_status (pending, active, permanent close)


const contactSchema =new mongoose.Schema({
  name:{
    type: String,
    default: ''
  },
  contact:{
    type: String,
    unique : true, 
    required:true
  } ,
  joined_date:{
    type: Date,
    default: Date.now()
  },
  account_status:{
    type: String,
    default: 'active'
  } ,
 
 
},{timestamps: true})


// 1 ->excellent,2-very good,3->good,4->bad

contactSchema.index({
  _id: 1
}, {
  background: true
});
const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact