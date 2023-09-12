require("dotenv").config()

const sessionConfig={
    name:process.env.session_name,
    secret:process.env.secret,
    cookie:{
        maxAge: 9000*60,
        // maxAge: 2678400000, //31 Days,
        secure:false,
        httpOnly:true
    },
    resave: false,
    saveUninitialized: false,
}



module.exports = sessionConfig;