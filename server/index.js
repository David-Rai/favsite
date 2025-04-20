const express=require('express')
const app=express()
const cors=require("cors")
const siteRouter=require('./routes/siteRoute.js')
const userRouter=require('./routes/userRoute.js')
const errorhandling=require("./middlewares/errorhandling.js")
require("dotenv").config()

const corsOptions={
origin:"http://localhost:5173",
methods:['GET','POST','PUT','DELETE'],
credentials:true
}
//cross origin resources sharing
app.use(cors(corsOptions))

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//initilization the routers
app.use(siteRouter)
app.use(userRouter)


//error handling
app.use(errorhandling)

const port=process.env.SERVER_PORT || 1111
app.listen(port,()=> console.log("server is running",port))