const express=require('express')
const app=express()
const cors=require("cors")
const router=require('./routes/siteRoute.js')
require("dotenv").config()

const corsOptions={
origin:"http://localhost:5173/"
}
//cross origin resources sharing
app.use(cors())

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//initilization the routes
app.use(router)
console.log(process.env.PORT)

const port=process.env.PORT
app.listen(port,()=> console.log("server is running"))