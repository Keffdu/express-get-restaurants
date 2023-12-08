const { Router } = require("express")
const express = require("express");
const {Restaurant, Menu, Item} = require("../models/index")
const router = Router()
const { check, validationResult} = require("express-validator")

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get("/restaurants", async (req, res) => {
    const allRestaurants = await Restaurant.findAll({
        include: Menu,
            include: [{
                model: Menu,
                include: [{
                    model: Item
                }]
            }]
    })
    res.json(allRestaurants)
})

router.get("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    console.log(req.params.id)
    res.json(restaurant)
})

router.post("/restaurants", [
    check("name").not().isEmpty().trim(),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.json({error: errors.array()})
    } else {
    const restaurant = await Restaurant.create(req.body)
    const allRestaurants = await Restaurant.findAll()
    res.json(allRestaurants)
    }
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