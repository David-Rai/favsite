const express = require('express')
const router = express.Router()
const { getAll,addSite,deleteSite,updateSite } = require("../controllers/siteController.js")
const {body,validationResult,param}=require("express-validator")
const auth=require("../auth/auth.js")

//getting all the data from the database
router.get("/get",auth, getAll)

//adding the new site
router.post("/add",auth,[
    body('site_path').notEmpty().withMessage("no empty field allowed"),
    body('name').notEmpty().withMessage("enter the name")
],addSite)

//deleting the site
router.delete('/delete/',auth,[
body("id").notEmpty().withMessage("id is required")
],deleteSite)

//updating the site
router.put('/update',auth,[
    body('site_path').notEmpty().withMessage("no empty field allowed"),
    body('name').notEmpty().withMessage("enter the name"),

],updateSite)


module.exports = router

