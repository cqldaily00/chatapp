const express=require("express");
const cors = require('cors');
const app =express()
const session =require("express-session");

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
const contactRoutes =require("./API/Routers/contatcRouter");
const messageRoute =require("./API/Routers/postMessagePersonsRouters");


const sessionConfig =require("./session");

app.use(session(sessionConfig))


app.use("/contact",contactRoutes)
app.use("/msg",messageRoute)






app.use("*",(req,res)=>{res.status(400).json({Message:`${req.method} ${req.baseUrl} not Found !!`})})

module.exports=app;