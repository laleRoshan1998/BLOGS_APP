const express = require('express')
const router = express.Router()
const {verifytoken} =  require('../authentication/jwt')
const {Like, see_likes} = require('../controllers/like_dislikes')



router.post('/Likess/:id',verifytoken,Like)

router.get('/likes/:id',verifytoken,see_likes)

router.get('/all_blogs_like',verifytoken,see_all_blog_like)

module.exports = router