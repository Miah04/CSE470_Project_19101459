const express= require("express")
const app= express()
const mongoose=require("mongoose")
const path=require("path")
const bodyParser=require("body-parser")
const session = require("express-session")
const { redirect } = require("express/lib/response")

const userData= require("../model/userData")
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(path.join(__dirname,"/public")))
app.use(bodyParser.urlencoded())
app.set("view engine","ejs")

app.use(
    bodyParser.urlencoded({
        extended:true,
    })
)
app.use(session(
    {
        secret:"asd-dweC-EDSAKJHy",
        resave:true,
        saveUninitialized:true,
    }
))

// app.use(require("./routes/user"))

app.get('/',(req,res)=>{
    // console.log("i am home");
    res.render("index")
})
//routing to all the other controllers from here->

const userRouter= require("./routes/user")
app.use('/', userRouter)
const mangaRouter= require("./routes/manga")
app.use('/', mangaRouter)
const viewMangaRouter= require("./routes/viewManga")
app.use('/', viewMangaRouter)
const cartRouter= require("./routes/cart")
app.use('/', cartRouter)
//connecting to local database
mongoose.connect("mongodb://0.0.0.0:27017/honya",{useNewUrlParser:true})
.then(()=>{
    app.listen(3000,()=>{
        console.log("server running in 3000");
    })
    
})
   
const con=mongoose.connection
con.on("open",()=>{
    console.log("database connected");
})

