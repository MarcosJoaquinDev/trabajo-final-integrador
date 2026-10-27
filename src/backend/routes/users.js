const express = require("express")
const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    res.send('Toma todos los usuarios')
})

userRouter.get('/:id', (req, res) => {
    res.send("Toma el usuario: " + req.params.id)
})

module.exports = userRouter;