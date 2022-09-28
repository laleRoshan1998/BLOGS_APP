const knex = require('../config/db.connection');


const blogs_post = (req,res)=>{  
    console.log("yes this is working............");
    if(req.userdata.length == 0){
        res.send({
            "status": "error",
            "message": "id not available"
        })
    }else{
        const id = req.userdata[0].id
        // console.log(id);
        const {title,description} = req.body
        if(Object.keys(req.body).length == 0){
            console.log('blogs not added');
            res.send({
                "status": "error",
                "message": "empty blogs"
            })
        }else{
            knex('users').where({id}).then((data)=>{
                // console.log(data);
                knex("blogs").insert({title, description, user_id:id}).then((data1)=>{
                    console.log("blogs added");
                    const name = data[0]['name']
                    const email = data[0]['email']
                    const dict ={
                        "name": name,
                        "email": email,
                        
                    }
                    res.send({
                        "status": "successfully.....",
                        "data": {
                            "blogs_id": data1[0],
                            "title": title,
                            "descrition": description,
                            "user": dict
                        }
                    })
                }).catch((err)=>{
                    console.log('okkk');
                    res.send({
                        "status": "error",
                        "message": err.message
                    })
                })
            })
        }
    }
}

const Get_all_blogs = (req,res)=>{
    console.log('working....');
    knex.select('*').from('users').join('blogs','blogs.user_id', 'users.id').then((data)=>{
        let newArr = []
        for(let ind=0; ind<data.length;ind++){
            let objData = {
                "id":data[ind].id,
                "title":data[ind].title,
                "description":data[0].description,
                "user_id":data[ind].user_id,
                "create_user":{
                    "name":data[ind].name,
                    "email":data[ind].email
                }
            }
            newArr.push(objData)
        }
        res.send({
            "status": 'successfully.....',
            "count": newArr.length,
            "data": newArr
        })
    }).catch((error)=>{
        console.log(error);
    })
}

const update_blogs = (req,res)=>{
    console.log('its working.......');
    id = req.params.id
    knex('blogs').where({id}).then((data)=>{
        if(data.length == 0){
            console.log('blogs is not avalible');
            res.send('blogs is not avalible')
        } else if(req.userdata == 0){
            console.log('user not avalible in database');
            res.send('user not avalible in database')
        }
        else{
            const User_id = req.userdata[0].id
            const uptitale = (req.body.title || data[0].title)
            const updescription = (req.body.description || data[0].description)
            const user_id = data[0]['user_id']
            knex('users').where({id:user_id}).then((info)=>{
                // console.log(info);
                const all_data = {
                    "blog_id": data[0] ['id'],
                    "updated_title": uptitale,
                    "updated_desctiption": updescription,
                    'user': {
                        "name": info[0]['name'],
                        "email": info[0]['email']
                    }
                }
                if(User_id == user_id) {
                    knex('blogs').where({id}).update({title: uptitale, description:updescription}).then((show_data)=>{
                        console.log(show_data);
                        res.send({
                            "status": 'successfully',
                            "data": all_data
                        })
                    })
                }else{
                    console.log('error');
                    res.send({
                        "status": 'error',
                        "message": 'you are not this blogs'
                    })
                }
            })
        }
    }).catch((err)=>{
        console.log(err);
        res.send(err)
    })  
}


const Delete_blogs = (req,res)=>{
    console.log('its working.........');
    if(req.userdata.length == 0 ){
        console.log('user not available in database');
        res.send({
            'status': 'error',
            "message": 'user not available in database'
        })
    } else {
        const id = req.params.id
        const User_ID = req.userdata[0].id
        knex('blogs').where({id}).then(async(data1)=>{
            if(data1.length == 0){
                console.log('this blogs is not available');
                res.send({
                    'status': 'error',
                    'message': "this blogs is not available"
                })
            } else {
                const user_id = data1[0]['user_id']
                if(User_ID == user_id){
                    // await knex('likedislike').where({blogs_id:id})
                    knex('blogs').where({id}).del().then((info)=>{
                        console.log('blogs deleteded');
                        if(info == 1){
                            res.send({
                                "status": 'successfull...',
                                'data': data1
                            })
                        }
                    }).catch((err) =>{
                        res.send(err.message)
                    })
                } else {
                    res.send({
                        'status': 'error',
                        'message': 'this is not your blog'
                    })
                }
            }
        })
    }
}
module.exports={blogs_post,Get_all_blogs,update_blogs,Delete_blogs} 