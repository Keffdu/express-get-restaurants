const { Router } = require("express")
const Restaurant = require("../models/index")
const router = Router()

router.get("/restaurants", async (req, res) => {
    const allRestaurants = await Restaurant.findAll()
    res.json(allRestaurants)
})

router.get("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    console.log(req.params.id)
    res.json(restaurant)
})

router.post("/restaurants", async (req, res) => {
    const restaurant = await Restaurant.create(req.body)
    res.json(restaurant)
})

router.put("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.update(req.body)
    res.json(restaurant)
})

router.delete("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.destroy()
    res.sendStatus(res.statusCode)
})

module.exports = router;