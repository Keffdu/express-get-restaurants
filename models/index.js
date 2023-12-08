const Restaurant = require('./Restaurant')
const Item = require("./Item")
const Menu = require("./Menu")

Restaurant.hasMany(Menu)
Menu.belongsTo(Restaurant)

Item.belongsToMany(Menu, {through: "menu-items"})
Menu.belongsToMany(Item, {through: "menu-items"})

const addToMenu = async () => {
    const menu = await Menu.findByPk(1)
    const allItems = await Item.findAll()
    menu.addItems([allItems[0], allItems[1]])
}

addToMenu()

module.exports = {
    Restaurant,
    Item,
    Menu
};