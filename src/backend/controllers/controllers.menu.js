const Menu = require('../repositories/repository.menu.js')

function getFullMenu(){
    const allMenu = new Menu() 
    return allMenu.getAll()
}

function getDishByName(name){
    return null
}

function getDishByPrice(price){
    return []
}

function getDishByCategory(category){
    const allMenu = getFullMenu()
    const arrayMenu = allMenu.menu
    const filteredMenu = arrayMenu.filter(i => i.categoria == category)
    return filteredMenu
}

function getDishById(id){
    return null
}

module.exports = {
        getFullMenu,
        getDishByName,
        getDishByPrice,
        getDishByCategory,
        getDishById
    }