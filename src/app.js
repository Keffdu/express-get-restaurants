const express = require("express");
const app = express();
const router = require("../routes/restaurants")
// const Restaurant = require("../models/index")

const db = require("../db/connection");

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use("/router", router)




module.exports = app;