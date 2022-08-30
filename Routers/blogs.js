const express = require('express')
const { verifytoken } = require('../authentication/jwt')
const router = express.Router()
const{blogs_post,Get_all_blogs,update_blogs,Delete_blogs} = require('../controllers/blogs,js')

router.post('/blogs',verifytoken,blogs_post)

router.get('/get_blogs',Get_all_blogs)

router.put('/update/:id',verifytoken,update_blogs)

router.delete('/delete_blogs/:id',verifytoken,Delete_blogs)

module.exports = router