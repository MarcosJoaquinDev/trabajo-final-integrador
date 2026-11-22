const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/controllers.users.js")
const { adminOnly,middlewareToken } = require("../middlewares/middleware.user.js")

userRouter.get('/', middlewareToken, adminOnly, async (req, res) => {
    try {
        const response = await userController.getAllUsers(req.dataUser.rol);
        res.json(response);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

userRouter.post('/register', async (req, res) => {
    try {
        const { name, password, email } = req.body;
        // El rol siempre lo asigna el servidor: alta pública = "usuario".
        const response = await userController.createUser(name, password, email);
        res.status(201).json(response);
    } catch (e) {
        res.status(e.status || 500).json({ error: e.message });
    }
})

userRouter.post('/login', async (req, res) => {
    try {
        const { password, email } = req.body;
        const token = await userController.verifyUser(email, password);
        if (token instanceof Error) {
            return res.status(401).json({ error: token.message });
        }
        res.json({ token });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

userRouter.get('/:id', middlewareToken, adminOnly, async (req, res) => {
    try {
        const user = await userController.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

userRouter.put('/:id', middlewareToken, adminOnly, async (req, res) => {
    try {
        const user = await userController.updateUserById(req.params.id, req.body ?? {});
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (e) {
        res.status(e.status || 500).json({ error: e.message });
    }
})

userRouter.delete('/:id', middlewareToken, adminOnly, async (req, res) => {
    try {
        const deleted = await userController.deleteUserById(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(deleted);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

module.exports = userRouter;
