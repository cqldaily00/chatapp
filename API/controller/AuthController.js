

require("../../db_connect/db");
const Contact = require("../models/contact");





const loginUser = async (req, res) => {
    const { contact } = req.body;
    try {
        
        const checkContact =await Contact.find({contact:contact})
        if (checkContact.length > 0) {
          req.session.contact=checkContact;
            return res.status(200).json(checkContact);
            // return res.status(500).json({"contact":"this contact number already exits"});
          }else{
          return res.status(404).json({"contact":"this contact number not exits"});

        }  
       
        
        // Redirect to the dashboard page after successful login
      } catch (error) {
        //  return  res.status(500).json(error);
         return  res.status(500).json({ message: 'Internal server error' });
      }
  };

module.exports = {
    loginUser,
};




























// require("../../db_connect/db");
// const User = require("../models/user");

// const storage = require('node-sessionstorage')


// const login = async (req, res) => {
 
// };

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.aggregate([
//           {
//             $match: { email, password }
//           }
//         ]);
    
//         if (user.length === 0) {
//           return res.status(404).json({ message: 'User not found or invalid credentials' });
//         }
    
//         // Authentication successful
//         // You can perform additional actions here, such as creating a session or generating a JWT token
//         // sessionStorage.setItem("userId",user[0]._id);
//         // req.session.userId = user;
//         // console.log("storage.getItem('userId')");
//         // console.log(storage.getItem('userId'));
//         req.session.userId=user;
//         // await  storage.setItem('userId', user[0]._id)
//         return res.redirect('/chart'); // Redirect to the dashboard page after successful login
//       } catch (error) {
//         //  return  res.status(500).json(error);
//          return  res.status(500).json({ message: 'Internal server error' });
//       }
//   };

// module.exports = {
//     loginUser,
// };
