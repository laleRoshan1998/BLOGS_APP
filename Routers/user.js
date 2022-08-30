const express = require('express')
const router = express.Router()


const {add_users,log_in} = require("../controllers/user.js")

router.post("/sigup",add_users)


router.get("/login",log_in)    

module.exports = router