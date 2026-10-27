const express = require("express")
const menuRouter = express.Router()
const menuController = require("../controllers/controllers.menu.js")

menuRouter.get('/', (req, res) => {
    const menu = menuController.getFullMenu()
    res.json(menu)
})

menuRouter.get('/category/:category', (req, res) => {
    const category = req.params.category
    const menu = menuController.getDishByCategory(category)
    res.json(menu)
})



module.exports = menuRouter;