const express=require("express")
const router= express.Router()

const mangaDetails= require("../../model/mangadetails")
const userData= require("../../model/userData")
const { redirect } = require("express/lib/response")

router.get('/details', async (req,res)=>{ 
    
    const filter={name:req.body.name,volume:req.body.vol };
    const all=await mangaDetails.find(filter);
    res.render("MangaDetails",{details:all[0]})
})
router.post('/details',async (req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    
    const filter={name:req.body.name,volume:req.body.vol };
    const all=await mangaDetails.find(filter);
    res.render("Mangadetails",{details:all[0]})
})

router.get('/browse',async (req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    const filter={};
    const all=await mangaDetails.find(filter)
    // console.log(user.typed);
    res.render("products",{details:all, s:1})
    
})
router.get('/sortName',(req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    mangaDetails.find({}).sort('name').exec(function(err, docs) {
        res.render("products",{details:docs, s:0})
    });
})
router.get('/sortNameAdmin',(req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    mangaDetails.find({}).sort('name').exec(function(err, docs) {
        res.render("adminLanding",{details:docs, s:0})
    });
})

router.get('/sortPrice',(req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    mangaDetails.find({}).sort('price').exec(function(err, docs) {
        res.render("products",{details:docs, s:0})
    });
})
router.get('/sortPriceAdmin',(req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    mangaDetails.find({}).sort('price').exec(function(err, docs) {
        res.render("adminLanding",{details:docs, s:0})
    });
})

router.post("/search", async (req, res) => {
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
        console.log(req.body.search);
    
    const filter1={username:req.session.username};
    const user=await userData.find(filter1);
    const all= await mangaDetails.find( { $text: { $search: req.body.search } } )
    if (user[0].typed=="admin"){
        res.render("adminLanding", { details:all , s:0})
    }
    else{
        res.render("products", { details:all , s:0})
    }
     
  })
module.exports = router