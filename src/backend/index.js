const express = require('express');
const userRouter = require('./routes/users.js')
const menuRouter = require('./routes/menu.js')

function main(){
    const app = express()
    const port = 3000

    app.use("/users", userRouter)
    app.use("/menu", menuRouter)

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })

}

main();