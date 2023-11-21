const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/restaurants", async (req, res) => {
    const allRestaurants = await Restaurant.findAll()
    res.json(allRestaurants)
})

app.get("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.json(restaurant)
})

app.post("/restaurants", async (req, res) => {
    const restaurant = await Restaurant.create(req.body)
    res.json(restaurant)
})

app.put("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    restaurant.update(req.body)
    res.json(restaurant)
})

app.delete("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    restaurant.destroy()
    res.sendStatus(res.status)
})




module.exports = app;