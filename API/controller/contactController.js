require("../../db_connect/db");

const socketIO = require('socket.io');

const contactController = require("../models/contact");
const Message = require("../models/messages_persons");






// const getUser = async (req,res)=> {
//     if (!req.session.userId) {
//         return res.redirect("/user/login"); // Redirect to the login page
//     }

//      await user.find({ email: { $ne: req.session.userId[0]['email'] } } ).then((users)=>{
//       res.render('profileChat',{
//         data:users
//     })
//     });
   
// const getUser = async (req,res)=> {

//      await contactController.find({ contact: { $ne: req.body.contact } } ).then((users)=>{
//       return res.status(200).json(users)
//     }).catch((err)=>{
//       return res.status(500).json(err);
//     });

//     const contactController = require('./contactController'); // Assuming you have imported the contactController



    
   
// } 
const express = require('express');
const app = express();
const server = require('http').createServer(app); // Assuming 'app' is your express app.
const io = socketIO(server);


io.on('connection', (socket) => {
  console.log('A client connected');
  socket.on('userUpdate', (data) => {
    console.log('A client connected '); 
  });
 
});
const getUser = async (req, res) => {
  try {
    // const contacts = await contactController.find({ contact: { $ne: req.body.contact } }).exec();
  
    const populatedContacts = await contactController.aggregate([
      {
        // $match: { _id: { $ne:null } }
        $match: { contact: { $ne: req.body.contact } }
      },
      {
        $lookup: {
          from: 'messagepersons',
          localField: '_id',
          foreignField: 'from_person',
          as: 'from_messages'
        }
      },
      {
        $lookup: {
          from: 'messagepersons',
          localField: '_id',
          foreignField: 'to_person',
          as: 'to_messages'
        }
      },
      {
        $addFields: {
          text_status: {
            show: {
              $size: {
                $filter: {
                  input: {
                    $concatArrays: [
                      { $ifNull: ['$from_messages.text_status', []] },
                      { $ifNull: ['$to_messages.text_status', []] }
                    ]
                  },
                  as: 'status',
                  cond: { $eq: ['$$status', 'show'] }
                }
              }
            },
            unshow: {
              $size: {
                $filter: {
                  input: {
                    $concatArrays: [
                      { $ifNull: ['$from_messages.text_status', []] },
                      { $ifNull: ['$to_messages.text_status', []] }
                    ]
                  },
                  as: 'status',
                  cond: { $ne: ['$$status', 'show'] }
                }
              }
            }
          }
        }
      },
      // {
      //   $addFields: {
      //     text_status: {
      //       $concatArrays: [
      //         { $ifNull: ['$from_messages.text_status', []] },
      //         { $ifNull: ['$to_messages.text_status', []] }
      //       ]
      //     }
      //   }
      // },
      {
        $project: {
          _id: 1,
          name: 1,
          contact: 1,
          joined_date: 1,
          account_status: 1,
          text_status: 1,
          // text_status: {
          //   $filter: {
          //     input: '$text_status',
          //     as: 'status',
          //     cond: { $ne: ['$$status', 'show'] }
          //   }
          // },
          createdAt: 1,
          updatedAt: 1,
          __v: 1
        }
      }
    ]);
    io.emit('userUpdate', populatedContacts);
    return res.status(200).json(populatedContacts);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};


const postContact = async (req,res)=> {

    try {

        const checkContact =await contactController.find({contact:req.body.contact})
        if (checkContact.length > 0) {
            // return res.status(500).json(checkContact);
            return res.status(500).json({"contact":"check contact number"});
        }

        await new contactController(req.body)
          .save()
          .then((success) => {
            return res.status(200).json(success);
          })
          .catch((err) => {
            return res.status(500).json(err);
          });
      } catch (error) {
        return res.status(500).json(error);
        
      }
} 



module.exports={
  postContact,
  getUser,
  
}