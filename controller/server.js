const app = require("./index")
const mongoose = require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/honya",{useNewUrlParser:true})


    

   
const con=mongoose.connection
con.on("open",()=>{
    console.log("database connected");
})

app.listen(3000,()=>{
    console.log("server running in 3000");
})

module.exports=con