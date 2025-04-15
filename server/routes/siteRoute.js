const express = require('express')
const router = express.Router()
const { getAll,addSite,deleteSite,updateSite } = require("../controllers/siteController.js")
const {body,validationResult,param}=require("express-validator")

//getting all the data from the database
router.get("/", getAll)

//adding the new site
router.post("/add",[
    body('site_path').notEmpty().withMessage("no empty field allowed"),
    body('name').notEmpty().withMessage("enter the name")
],addSite)

//deleting the site
router.delete('/delete/:id',[
    param('id').isInt().withMessage("enter the proper id")
],deleteSite)

//updating the site
router.put('/update',[
    body('site_path').notEmpty().withMessage("no empty field allowed"),
    body('name').notEmpty().withMessage("enter the name"),
    param('id').isInt().withMessage("enter the proper id")

],updateSite)


module.exports = router

