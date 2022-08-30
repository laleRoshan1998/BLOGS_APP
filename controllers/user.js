const knex = require("../config/db.connection");
const express = require('express');
const {generate_token}= require("../authentication/jwt")

add_users =  async(req,res)=>{
    const {name, email, password} = req.body
    try {
        const data = await knex("users").insert({email,password,name})
        res.send({
            "status":"success",
            message:"user added successfuly......",
            data:req.body
        })
    } catch (error) {
        console.log("user is already added");
        res.send({
            "status":"error",
            message: "user is already added"
        })
    }
}


log_in = async (req,res)=>{
    const {email, password} =  req.body
    // console.log(req.body);
    try{
        const data = await knex('users').where({email,password})
        if(data.length !== 0){
            const token = generate_token(data[0]['id'])
            res.cookie('token',token)
            console.log('login user....in'); 
            return res.send({
                'status': "success",
                "message": data
            })
        }else {
            res.send({
                "status":'error',
                "message": "incrrect email or password"
            })
        }
    } catch (error){
        res.send({
            'status': 'error',
            'message': error.message
        })
    }
}



module.exports = {add_users,log_in}