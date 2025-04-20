const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
const {token}=req.cookies

if(!token){
    return res.redirect('/register')
}


const secretKey=process.env.SECRET
jwt.verify(token,secretKey,(err,decoded)=>{
    req.user=decoded
})

next()
}

module.exports=auth