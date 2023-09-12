const express=require("express");
const cors = require('cors');
const app =express()
const session =require("express-session");

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
const contactRoutes =require("./API/Routers/contatcRouter");
// const chartRoutes =require("./API/routers/chartRoute");


const sessionConfig =require("./session");

app.use(session(sessionConfig))


app.use("/contact",contactRoutes)
// app.use("/chart",chartRoutes)






app.use("*",(req,res)=>{res.status(400).json({Message:`${req.method} ${req.baseUrl} not Found !!`})})

module.exports=app;