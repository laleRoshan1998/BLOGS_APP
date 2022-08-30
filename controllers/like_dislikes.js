const { Knex } = require('knex');
const knex = require('../config/db.connection')



const Like = (req,res)=>{
    console.log('itz working........');
    // const user_id = req.userdata[0].id
    // console.log(user_id);
    knex.select("*").from('blogs').then((data)=>{
        const userdata ={
            user_id:req.user_id,
            like:req.body.like,
            dislike:req.body.dislike
        }
        if (req.body.like == true){
            Knex('LikeDislike').insert(userdata).then((data)=>{
                console.log(data);
                res.send("like successfully......")
            })
        }else if(req.body.dislike == false){
            knex('LikeDislike').insert(userdata).then((data)=>{
                console.log(data);
                res.send('dislike successfully.....')
            })
        }
    })
}



module.exports={Like}