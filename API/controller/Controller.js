require("../../db_connect/db");


const user = require("../models/user");
const chart = require("../models/chat");

const getControllerSurvey = async (req,res)=> {
    try {
        const surveys = await survey_route.aggregate([
          {
            $lookup: {
              from: "commentmodal2023", 
              foreignField: "surveyId", 
              localField: "_id", 
              as: "comments" 
            }
          }
        ]);
        return res.status(200).json(surveys);
      } catch (error) {
        return res.status(500).json(error);
      }
} 

 // var user_data= new user(req.body)
  // user_data.save().then((d)=>{
  //   res.redirect('users')
  // })

//   app.get('/users',(req,res)=>{
//     User.find({}).then((users)=>{
//     res.render('users',{
//         data:users
//     })
// })
// })

const getUser = async (req,res)=> {
  if (!req.session.userId) {
    return res.redirect("/user/login"); // Redirect to the login page
}

     await user.find({ email: { $ne: req.session.userId[0]['email'] } } ).then((users)=>{
      res.render('profileChat',{
        data:users
    })
    });
   
} 
const postUser = async (req,res)=> {
 

    try {
        await new user(req.body)
          .save()
          .then((success) => {
           return res.redirect('/user')
          })
          .catch((err) => {
            return res.status(200).json({ data: err });
          });
      } catch (error) {
        res.status(500).json({ data: error });
        return;
      }
} 
const postChart = async (req,res)=> {

  var data={
    chart:req.body.chart,
    userId:req.session.userId[0]['_id'],
    chartUserId:req.params.id
  }
    try {
        await new chart(data)
          .save()
          .then((success) => {
           return res.redirect(`/chart/post/${req.params.id}`)
          })
          .catch((err) => {
            return res.status(200).json({ data: err });
          });
      } catch (error) {
        res.status(500).json({ data: error });
        return;
      }
} 
const mongoose = require('mongoose');
const { loginUser } = require("./AuthController");
const ObjectId = mongoose.Types.ObjectId;


const getChart = async (req, res) => {
  if (!req.session.userId) {
            return res.redirect("/user/login"); // Redirect to the login page
  }
  await user.aggregate([
    {
      $match: {
        email:req.session.userId[0]['email']
      }
    },
    {
      
      
      
      $lookup: {
        from: "charts",
        localField: "_id",
        foreignField: "userId",
        as: "user"
      }
    },
    {
      $lookup: {
        from: "charts",
        localField: "_id",
        foreignField: "chartUserId",
        as: "chartUser"
      }
    }
  ]).sort({createdAt:-1}).then((users) => {
    res.render('chat',{
      data:users
  })

  //  return res.status(200).json(users);
  }).catch((error) => {
    // Handle error
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  });
}

module.exports={
    getUser,
    postUser,
    postChart,
    getChart
}