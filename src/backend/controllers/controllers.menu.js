const Menu = require('../repositories/repository.menu.js')

const CATEGORY_FIELDS = ["categoria", "items", "nota_guarnicion"]
const ITEM_FIELDS = ["nombre", "descripcion", "precio", "precios", "promocion"]

function createError(message, status) {
    const error = new Error(message)
    error.status = status
    return error
}

function normalize(value) {
    return String(value ?? "").trim().toLowerCase()
}

async function getFullMenu() {
    const allMenu = new Menu()
    return await allMenu.getAll()
}

async function getDishByName(name) {
    const allMenu = await getFullMenu()
    const search = normalize(name)
    const found = []
    allMenu.forEach((category) => {
        const items = category.items ?? []
        items.forEach((item) => {
            if (normalize(item.nombre) === search) {
                found.push({ categoria: category.categoria, categoriaId: category.id, ...item })
            }
        })
    })
    return found
}

async function getDishByPrice(price) {
    const allMenu = await getFullMenu()
    const found = []
    allMenu.forEach((category) => {
        const items = category.items ?? []
        items.forEach((item) => {
            if (item.precio === price || item.precios?.chica === price || item.precios?.grande === price) {
                found.push({ categoria: category.categoria, categoriaId: category.id, ...item })
            }
        })
    })
    return found
}

async function getDishByCategory(category) {
    const allMenu = await getFullMenu()
    const search = normalize(category)
    return allMenu.filter((item) => normalize(item.categoria) === search)
}

async function getDishById(id) {
    const allMenu = new Menu()
    return await allMenu.getById(id)
}

async function createCategory(data) {
    if (!data.categoria || !normalize(data.categoria)) {
        throw createError("La categoría es obligatoria", 400)
    }
    if (data.items !== undefined && !Array.isArray(data.items)) {
        throw createError("Los items deben ser un array", 400)
    }

    const categoryData = {
        categoria: data.categoria,
        items: data.items ?? [],
    }
    if (data.nota_guarnicion !== undefined) {
        categoryData.nota_guarnicion = data.nota_guarnicion
    }

    const allMenu = new Menu()
    return await allMenu.create(categoryData)
}

async function updateCategory(id, data) {
    const allMenu = new Menu()
    const categoryFound = await allMenu.getById(id)
    if (!categoryFound) {
        return null
    }

    const updateData = {}
    CATEGORY_FIELDS.forEach((field) => {
        if (data[field] !== undefined) {
            updateData[field] = data[field]
        }
    })

    if (updateData.items !== undefined && !Array.isArray(updateData.items)) {
        throw createError("Los items deben ser un array", 400)
    }
    if (updateData.categoria !== undefined && !normalize(updateData.categoria)) {
        throw createError("La categoría no puede estar vacía", 400)
    }
    if (Object.keys(updateData).length === 0) {
        throw createError("No hay campos válidos para actualizar", 400)
    }

    return await allMenu.update(id, updateData)
}

async function deleteCategory(id) {
    const allMenu = new Menu()
    const categoryFound = await allMenu.getById(id)
    if (!categoryFound) {
        return null
    }
    return await allMenu.delete(id)
}

async function addItem(id, data) {
    const allMenu = new Menu()
    const categoryFound = await allMenu.getById(id)
    if (!categoryFound) {
        return null
    }
    if (!data.nombre || !normalize(data.nombre)) {
        throw createError("El nombre del plato es obligatorio", 400)
    }

    const item = {}
    ITEM_FIELDS.forEach((field) => {
        if (data[field] !== undefined) {
            item[field] = data[field]
        }
    })

    const items = categoryFound.items ?? []
    const duplicated = items.some((current) => normalize(current.nombre) === normalize(item.nombre))
    if (duplicated) {
        throw createError("Ya existe un plato con ese nombre en la categoría", 409)
    }

    return await allMenu.update(id, { items: [...items, item] })
}

async function updateItem(id, itemName, data) {
    const allMenu = new Menu()
    const categoryFound = await allMenu.getById(id)
    if (!categoryFound) {
        return null
    }

    const updateData = {}
    ITEM_FIELDS.forEach((field) => {
        if (data[field] !== undefined) {
            updateData[field] = data[field]
        }
    })
    if (Object.keys(updateData).length === 0) {
        throw createError("No hay campos válidos para actualizar", 400)
    }
    if (updateData.nombre !== undefined && !normalize(updateData.nombre)) {
        throw createError("El nombre del plato no puede estar vacío", 400)
    }

    const items = categoryFound.items ?? []
    const itemIndex = items.findIndex((current) => normalize(current.nombre) === normalize(itemName))
    if (itemIndex === -1) {
        return null
    }

    const updatedItem = { ...items[itemIndex], ...updateData }
    const updatedItems = items.map((current, index) => (index === itemIndex ? updatedItem : current))

    const category = await allMenu.update(id, { items: updatedItems })
    return { ...updatedItem, categoria: category.categoria, categoriaId: category.id }
}

async function deleteItem(id, itemName) {
    const allMenu = new Menu()
    const categoryFound = await allMenu.getById(id)
    if (!categoryFound) {
        return null
    }

    const items = categoryFound.items ?? []
    const itemIndex = items.findIndex((current) => normalize(current.nombre) === normalize(itemName))
    if (itemIndex === -1) {
        return null
    }

    const deletedItem = items[itemIndex]
    const updatedItems = items.filter((current, index) => index !== itemIndex)
    await allMenu.update(id, { items: updatedItems })

    return { ...deletedItem, categoria: categoryFound.categoria, categoriaId: categoryFound.id, deleted: true }
}

module.exports = {
    getFullMenu,
    getDishByName,
    getDishByPrice,
    getDishByCategory,
    getDishById,
    createCategory,
    updateCategory,
    deleteCategory,
    addItem,
    updateItem,
    deleteItem,
}
