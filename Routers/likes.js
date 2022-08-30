const express = require('express')
const router = express.Router()
const {verifytoken} =  require('../authentication/jwt')
const {Like} = require('../controllers/like_dislikes')



router.post('/Likess/:id',verifytoken,Like)

module.exports = router