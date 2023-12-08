const Sequelize = require("sequelize")
const db = require("../db/connection")

const Menu = db.define("menus", {
    title: Sequelize.STRING
})

module.exports = Menu;