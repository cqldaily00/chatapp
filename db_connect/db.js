// const dotenv=require('dotenv').config()
const mongoose = require('mongoose')


let Port="mongodb://127.0.0.1:27017"


// Updated connection code
mongoose.connect(`${Port}/chatDB`)
  .then(() => {
    console.log('Connected to MongoDB');
    // Additional code after successful connection
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });