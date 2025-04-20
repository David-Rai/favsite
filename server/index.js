const express=require('express')
const app=express()
const cors=require("cors")
const router=require('./routes/siteRoute.js')
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

//initilization the routes
app.use(router)


//error handling
app.use(errorhandling)

const port=process.env.PORT
app.listen(port,()=> console.log("server is running",port))