// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Restaurant } = require('./models/index')
const app = require('./src/app');


describe('/restaurants endpoint', () => {
    it("returns all restaurants", async () => {
        const response = await request(app).get("/router/restaurants")
        expect(response.body[0].name).toBe("AppleBees")
    })
    it("returns array", async () => {
        const response = await request(app).get("/router/restaurants")
        expect(Array.isArray(response.body)).toBe(true)
    })
    it("returns correct array length", async () => {
        const response = await request(app).get("/router/restaurants")
        expect(response.body.length).toBe(3)
    })
   
    it("returns 200 status", async () => {
        const response = await request(app).get("/router/restaurants")
        expect(response.statusCode).toBe(200)
    })

    it("Check post request, returns a new restaurant", async() =>{
     const response = await request(app).post("/router/restaurants").send({name: "Crust Brothers", location: "Shea & N. Scottsdale", cuisine: "Pizza"}).set('Accept', 'application/json')
     expect(response.body.name).toBe("Crust Brothers");
    })

    it("returns a restaurant", async () => {
        const response = await request(app).get("/router/restaurants/4")
        expect(response.body.name).toBe("Crust Brothers")
    })

    it ("returns 200 status for single item", async () =>{
        const response = await request(app).get("/router/restaurants/4")
        expect(response.statusCode).toBe(200)
    })
    
    it ("checks put request", async () =>{
        const responseData = await request(app).put("/router/restaurants/4").send({cuisine: "all great food"}).set('Accept', 'application/json')
        expect(responseData.body.cuisine).toBe("all great food")
    })
     
    it("checks delete request",async () =>{
        const responseData = await request(app).del("/router/restaurants/1")
        expect(responseData.statusCode).toBe(200)
    })
})
