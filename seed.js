const {Restaurant, Item, Menu} = require("./models/index")
const { seedRestaurant, seedItem, seedMenu } = require("./seedData");
const db = require("./db/connection")

const syncSeed = async () => {
    await db.sync({force: true});
    await Restaurant.bulkCreate(seedRestaurant)
    await Menu.bulkCreate(seedMenu)
    await Item.bulkCreate(seedItem)
    // BONUS: Update with Item and Menu bulkCreate


}

syncSeed()