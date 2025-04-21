const express=require("express")
const router=express.Router()
const {register,login,verify,logout}=require("../controllers/userController.js")
const {body}=require("express-validator")

//verification if user is valid or nor
router.get("/verify",verify)

//registration
router.post('/register',[
    body("name").notEmpty().withMessage("name is required"),
    body("email").isEmail().notEmpty().withMessage("email is required"),
    body("password").notEmpty().withMessage("password is required"),
],register)

//login 
router.post('/login',[
    body("email").isEmail().notEmpty().withMessage("email is required"),
    body("password").notEmpty().withMessage("password is required"),
],login)

//logout route
router.get('/logout',logout)

module.exports=router