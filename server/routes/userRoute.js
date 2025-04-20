const express=require("express")
const router=express.Router()
const {register}=require("../controllers/userController.js")
const {body}=require("express-validator")

//home page for login and registration
router.post('/register',[
    body("name").notEmpty().withMessage("name is required"),
    body("email").isEmail().notEmpty().withMessage("email is required"),
    body("password").notEmpty().withMessage("password is required"),
],register)

module.exports=router