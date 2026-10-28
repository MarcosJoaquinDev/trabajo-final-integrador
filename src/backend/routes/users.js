const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/controllers.users.js")
const middlewareToken = require("./middleware.js")

userRouter.get('/', middlewareToken, (req, res) => {
    const userRol = req.dataUser.rol;
    const response = userController.getAllUsers(userRol);
    res.json(response);
})

userRouter.get('/:id',middlewareToken, (req, res) => {
    res.send("Toma el usuario: " + req.params.id)
})

userRouter.post('/register', async (req, res) => {
    const { name,password,email,rol } = req.body;
    const response = await userController.createUser(name,password,email,rol);
    res.json(response);
})

userRouter.get('/login', async (req, res) => {
    const { password,email } = req.body;
    const token = await userController.loginUser(password,email);
    res.json(token);
})

module.exports = userRouter;