const express = require('express')
const app = express()
const port = 3000
const router = require("./Routers/user")

app.use(express.json())

app.use('/',router)
app.use('/',require("./Routers/blogs"))
app.use('/',require("./Routers/likes"))




app.listen(port, () => 
    console.log(`Example app listening on port ${port}!`))