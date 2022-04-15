const express=require("express")
const router= express.Router()

const mangaDetails= require("../../model/mangadetails")
const { redirect } = require("express/lib/response")


router.get('/addManga',(req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    else{
        res.render("addManga")
    }
    
})
router.get('/deleteManga',(req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    else{
        res.render("deleteManga")
    }
    
})

router.post('/addManga',async (req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    else{
        const manga=new mangaDetails(
            {
                name:req.body.name,
                author:req.body.author,
                publisher:req.body.publisher,
                type:req.body.type,
                volume:req.body.volume,
                status:req.body.status,
                genre:req.body.genre,
                theme:req.body.theme,
                demographic:req.body.demographic,
                image:req.body.img,
                price:req.body.price,
                
            }
    
        )
        manga.save()
        res.render("addManga",{success:"Manga Added to the database"})
    }
    

})
router.post('/deleteManga',async (req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    else{
        const wait1= await mangaDetails.deleteMany({ name:req.body.name, type:req.body.type, volume:req.body.volume }); 
     
    if (wait1){
        res.render("deleteManga",{success:"One entry successfully deleted"})
    }
    else{
        res.render("deleteManga",{success:"No such entry found"})
    }
    }
    
})


module.exports = router