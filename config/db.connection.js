

const knex = require('knex')({
    client: "mysql",
    connection :{
        host: "localhost",
        user: "root",
        database: "BlogApp",
        password: "Roshan@1"
    }
})

knex.schema.hasTable('users').then(exists => {
    if(!exists) {
        return knex.schema.createTable('users',table => {
            table.increments('id').primary()
            table.string("name")
            table.string('email').unique()
            table.string('password')

        }).then((r)=> {
            console.log('users tables created successfully......');

        }).catch((err)=> {
            console.log(err);
        })
    }
})

knex.schema.hasTable('blogs').then(exists =>{
    if(!exists){
        return knex.schema.createTable('blogs', table =>{
            table.increments('id').primary()
            table.integer('user_id').notNullable()
            table.string('title').notNullable()
            table.text('description').notNullable()
            table.foreign("user_id").references("id")        
        }).then(()=>{
            console.log('blogs table created successfully.......');
        })
        .catch((err)=>{
            console.log(err);
        })
    }
})

knex.schema.hasTable('LikeDislike').then(exists =>{
    if(!exists){
        return knex.schema.createTable('LikeDislike', table =>{
            table.increments('id').primary()
            table.integer('user_id').notNullable()
            table.boolean('Like')
            table.boolean('Dislike')

        }).then(()=>{
            console.log('Likes table create successfully.......');
        })
        .catch((err)=>{
            console.log(err);
        })
    }
})

module.exports = knex