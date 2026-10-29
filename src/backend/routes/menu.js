const express = require("express")
const menuRouter = express.Router()
const menuController = require("../controllers/controllers.menu.js")
const { adminOnly, middlewareToken } = require("../middlewares/middleware.user.js")

menuRouter.get('/', async (req, res) => {
    try {
        const menu = await menuController.getFullMenu()
        res.json(menu)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

menuRouter.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category
        const menu = await menuController.getDishByCategory(category)
        res.json(menu)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

menuRouter.get('/:id', async (req, res) => {
    try {
        const dish = await menuController.getDishById(req.params.id)
        if (!dish) {
            return res.status(404).json({ error: "Plato no encontrado" })
        }
        res.json(dish)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

menuRouter.post('/', middlewareToken, adminOnly, async (req, res) => {
    try {
        const category = await menuController.createCategory(req.body ?? {})
        res.status(201).json(category)
    } catch (e) {
        res.status(e.status || 500).json({ error: e.message })
    }
})

menuRouter.put('/:id', middlewareToken, adminOnly, async (req, res) => {
    try {
        const category = await menuController.updateCategory(req.params.id, req.body ?? {})
        if (!category) {
            return res.status(404).json({ error: "Categoría no encontrada" })
        }
        res.json(category)
    } catch (e) {
        res.status(e.status || 500).json({ error: e.message })
    }
})

menuRouter.delete('/:id', middlewareToken, adminOnly, async (req, res) => {
    try {
        const deleted = await menuController.deleteCategory(req.params.id)
        if (!deleted) {
            return res.status(404).json({ error: "Categoría no encontrada" })
        }
        res.json(deleted)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

menuRouter.post('/:id/items', middlewareToken, adminOnly, async (req, res) => {
    try {
        const item = await menuController.addItem(req.params.id, req.body ?? {})
        if (!item) {
            return res.status(404).json({ error: "Categoría no encontrada" })
        }
        res.status(201).json(item)
    } catch (e) {
        res.status(e.status || 500).json({ error: e.message })
    }
})

menuRouter.put('/:id/items/:itemName', middlewareToken, adminOnly, async (req, res) => {
    try {
        const item = await menuController.updateItem(req.params.id, req.params.itemName, req.body ?? {})
        if (!item) {
            return res.status(404).json({ error: "Categoría o plato no encontrado" })
        }
        res.json(item)
    } catch (e) {
        res.status(e.status || 500).json({ error: e.message })
    }
})

menuRouter.delete('/:id/items/:itemName', middlewareToken, adminOnly, async (req, res) => {
    try {
        const deleted = await menuController.deleteItem(req.params.id, req.params.itemName)
        if (!deleted) {
            return res.status(404).json({ error: "Categoría o plato no encontrado" })
        }
        res.json(deleted)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

module.exports = menuRouter;
