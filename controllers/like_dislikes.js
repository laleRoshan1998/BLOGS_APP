const knex = require('../config/db.connection')



const Like = (req,res)=>{
    console.log('itz working........');

    const user_id = req.userdata[0].id
    // console.log(user_id);
    const blog_id = req.params.id
    // console.log(blog_id);
    const like = req.body.like

    if(Object.keys(req.body).length == 0){
        console.log('empty blogs');
        res.send('blogs empty')
    } else {
        knex('blogs').where({id:blog_id}).then((data)=>{
            // console.log(data);
            if(data.length != 0){
                const user = data[0]['user_id']
                // console.log(user);
                knex('users').where({id:user}).then((user_data)=>{
                    // console.log(user_data);
                    knex('likedislike').where({user_id, blog_id}).then((liked)=>{
                        // res.send(liked)
                        if(liked.length != 0){
                            knex('likedislike').where({user_id, blog_id}).update({like}).then((updated)=>{
                                res.send({
                                    'like': like,
                                    "blog": {
                                        'title': data[0]['title'],
                                        'description': data[0]['descrption'],
                                        'user_id': data[0]['user_id']
                                    },
                                    "blog_id": blog_id,
                                    "user": {
                                        'name': user_data[0]['name'],
                                        'email': user_data[0]['email']
                                    }
                                })
                                // console.log('like updated');
                            })
                        }
                        else{
                            knex('likedislike').insert({user_id, blog_id}).then((sent)=>{
                                res.send({
                                    "like": like,
                                    "blog": {
                                        'title': data[0]['title'],
                                        'description': data[0]['description'],
                                        "user_id": data[0]['user_id']
                                    },
                                    "blog_id": blog_id,
                                    "user": {
                                        'name': user_data[0]['name'],
                                        'email': user_data[0]['email']
                                    }
                                })
                                // console.log('like added...');
                            })
                        }
                    })
                })
            }else{
                res.send({
                    "status": 'error',
                    "meassege": 'this blog not exist'
                })
            }
        })
    }
}



const see_likes = (req, res) =>{
    console.log('its working...');
    
    const blog_id = req.params.id
    // console.log(blog_id);
    knex('blogs').where({id:blog_id}).then((blogs_data)=>{
        // console.log(blogs_data);
        if(blogs_data.length == 0){
            res.send({
                'status': 'error',
                'message': 'this blog is not exist'
            })
        }else{
            knex('likedislike').where({blog_id: blog_id, like: 1}).then((like_data)=>{
                // console.log(like_data);
                knex("*").from('users').then((user_data)=>{
                    // console.log(user_data);
                    var collection_data = []
                    const like = like_data.map((ele)=>{
                        // console.log(like);
                        material = user_data.filter((Element)=>{
                            // console.log(Element);
                            dict = {}
                            if(ele['user_id'] == Element['id']){
                                dict['name'] = Element['name']
                                dict['email'] = Element['email']
                                collection_data.push(dict)
                            }
                            // console.log(collection_data);
                        })
                    })
                })
                const likes = []
                for(i in like_data){
                    dict1 = {}
                    dict1['like'] = like_data[i]['like']
                    dict1['user_id'] = like_data[i]['user_id']
                    dict1['user'] = like_data[i] ['user']
                    likes.push(dict1)
                }
                console.log(likes);
                res.send({
                    'title': blogs_data[0]['title'],
                    'descraption': blogs_data[0]['descraption'],
                    'blog_id': blogs_data[0]['id'],
                    'count': like_data.length,
                    'likes': likes
                })
            })
        }
    })
}





const see_all_blog_like = (req, res) => {
    console.log('its working.....');
    knex("*").from("users").join('blogs', "blogs.user_id", "users.id").then(async(data) => {
        const all_data = []
        for (i of data) {
            const id=i["id"]
            const like=await knex('likedislike').where({blog_id:id,like:1})
            const like_data=like
            let New_data = {
                "id": i['id'],
                "title": i['title'],
                "description": i["description"],
                "user_id": i["user_id"],
                "posted user": {
                    "name": i['name'],
                    "email": i['email']
                },
                'lieks':like_data,
            }
            all_data.push(New_data)
        }
        if (all_data.length == 0) {
            console.log("data is not avaleble");
            res.send({
                "status": "error",
                "message": "blogs are not availeble"
            })
        } else {

            console.log('showing data');
            res.send({
                "status": "success",
                "count": all_data.length,
                "data": all_data
            })
        }
    }).catch((err) => {
        console.log(err);
        res.send(err.message)
    })
}



module.exports={Like, see_likes,see_all_blog_like}