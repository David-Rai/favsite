const express = require('express')
const router = express.Router()
const { getAll,addSite,deleteSite,updateSite } = require("../controllers/siteController.js")

//getting all the data from the database
router.get("/", getAll)

//adding the new site
router.post("/add",addSite)

//deleting the site
router.delete('/delete/:id',deleteSite)

//updating the site
router.put('/update',updateSite)


module.exports = router

