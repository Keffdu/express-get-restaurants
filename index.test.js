// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician, Band } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('/musicians endpoint', () => {
    it("returns all musicians", async () => {
        const response = await request(app).get("/musicians")
        expect(response.body.length).toBe(3)
    })
   
    it("returns 200 status", async () => {
        const response = await request(app).get("/musicians")
        expect(response.statusCode).toBe(200)
    })
    
    it("returns all musicians", async () => {
        const response = await request(app).get("/musicians")
        const responseData = JSON.parse(response.text)
        expect(responseData.length).toBe(3)
    })
    it("Check post request, returns a new musician", async() =>{
     const responseData = await request(app).post("/musicians").send({name: "badbunny", instrument: "micro"}).set('Accept', 'application/json')
     expect(responseData.body.name).toBe("badbunny");
    })

    it ("returns 200 status", async () =>{
        const response = await request(app).get("/musicians/:id")
        expect(response.statusCode).toBe(200)
    })
    
    it ("checks put resquets", async () =>{
        const responseData = await request(app).put("/musicians/4").send({name: "bad bunny"}).set('Accept', 'application/json')
        expect(responseData.body.name).toBe("bad bunny")
    })
     
    it("checks delete request",async () =>{
        const responseData = await request(app).del("/musicians/4")
        expect(responseData.statusCode).toBe(200)
    })
})
describe('/Bands endpoint', () => {
    it("returns all bands", async () => {
        const response = await request(app).get("/bands")
        expect(response.body.length).toBe(3)
    })
   
    it("returns 200 status", async () => {
        const response = await request(app).get("/bands")
        expect(response.statusCode).toBe(200)
    })
    
    it("returns all bands", async () => {
        const response = await request(app).get("/bands")
        const responseData = JSON.parse(response.text)
        expect(responseData.length).toBe(3)
    })
    
})

describe("test id params", () => {
    it("returns param musician", async () => {
        const response = await request(app).get("/musicians/1")
        expect(response.body.name).toBe("Mick Jagger")
    })
})