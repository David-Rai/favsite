const express=require('express')
const app=express()
const cors=require("cors")

const corsOptions={
origin:"http://localhost:5173/"
}

//cross origin resources sharing
app.use(cors())

app.get('/',(req,res)=>{
res.json({message:"hey there"})
})

app.listen(1111)