const knex = require('../config/db.connection')
// const jwt = require('jsonwebtoken')
const jwt = require('jsonwebtoken')


const generate_token=(id)=>{
    console.log("generate token");
    return jwt.sign(id,"ImSecurity")
}

const verifytoken= async(req,res,next)=>{
    if(req.headers.cookie){
        const token=(req.headers.cookie).split('=')[1]
        const id=jwt.verify(token,"ImSecurity")
        console.log(id);
        const data=await knex('users').where({id})
        req.userdata = data
        // console.log(req.userdata);
        next()
        
    } else {
        res.send({
            "status": "error",
            "message": "faild Authantication failed"
        })
    }
}

module.exports={generate_token,verifytoken}