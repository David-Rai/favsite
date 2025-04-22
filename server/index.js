const express=require('express')
const app=express()
const cors=require("cors")
const siteRouter=require('./routes/siteRoute.js')
const userRouter=require('./routes/userRoute.js')
const errorhandling=require("./middlewares/errorhandling.js")
const cookieParser = require('cookie-parser')
require("dotenv").config()

const corsOptions={
origin: [
    'https://favsite.netlify.app',
    'https://favsite.netlify.app/' // Ensure both formats are allowed if necessary
  ],
methods:['GET','POST','PUT','DELETE'],
credentials:true
}
//cross origin resources sharing
app.use(cors(corsOptions))

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

//initilization the routers
app.use(siteRouter)
app.use(userRouter)


//error handling
app.use(errorhandling)

const PORT=process.env.PORT || 3000
app.listen(PORT,()=> console.log("server is running",PORT))
