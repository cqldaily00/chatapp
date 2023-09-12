require("../../db_connect/db");


const contactController = require("../models/contact");






// const getUser = async (req,res)=> {
//     if (!req.session.userId) {
//         return res.redirect("/user/login"); // Redirect to the login page
//     }

//      await user.find({ email: { $ne: req.session.userId[0]['email'] } } ).then((users)=>{
//       res.render('profileChat',{
//         data:users
//     })
//     });
   
// } 
const postContact = async (req,res)=> {

    try {

        const checkContact =await contactController.find({contact:req.body.contact})
        if (checkContact.length > 0) {
            // return res.status(500).json(checkContact);
            return res.status(500).json({"contact":"this contact number already exits"});
        }

        await new contactController(req.body)
          .save()
          .then((success) => {
            return res.status(200).json(success);
          })
          .catch((err) => {
            return res.status(200).json(err);
          });
      } catch (error) {
        return res.status(500).json(error);
        
      }
} 

module.exports={
  postContact
}