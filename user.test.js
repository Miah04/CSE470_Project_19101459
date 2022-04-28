const request = require("supertest")
const app = require("./controller/index")
const mongoose = require("mongoose")


describe("testing login", ()=>{
  beforeAll(async () => {
    mongoose.connect("mongodb://0.0.0.0:27017/honya", {
      useUnifiedTopology : true,
      useNewUrlParser    : true,
    })

    let connec = mongoose.connection
    connec.on("open", () => {
      console.log("database connected")
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
  test("Check if user login works", async()=>{
    const respond= await request(app).post("/LandingPage").send({
      username:"test1",
      password:"test",
    })
    
    expect(respond.statusCode).toBe(200)  
  })
})

