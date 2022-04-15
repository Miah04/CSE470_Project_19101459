const mongoose=require("mongoose")

const mangaSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require: true,
        },
        author:{
            type:String,
            require: false,
        },
        publisher:{
            type:String,
            require: false,
        },
        type:{
            type:String,
            require: true,
        },
        volume:{
            type:Number,
            require: true,
        },
        status:{
            type:String,
            require: false,
        },
        genre:{
            type:String,
            require: false,
        },
        theme:{
            type:String,
            require: false,
        },
        demographic:{
            type:String,
            require: false,
        },
        image:{
            type:String,
            require: true,
        },
        price:{
            type:Number,
            require: true,
        }
    }
)
mangaSchema.index({ "$**": "text" })
const mangaDetails=mongoose.model("MangaDetails",mangaSchema)
module.exports=mangaDetails