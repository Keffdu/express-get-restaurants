const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

app.get("/restaurants", async (req, res) => {
    const allRestaurants = await Restaurant.findAll()
    res.json(allRestaurants)
})

app.get("/restaurant/:id", async (req, res) => {
    
})




module.exports = app;