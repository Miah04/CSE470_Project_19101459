const express=require("express")
const { acceptsLanguages } = require("express/lib/request")
const router= express.Router()

const userData= require("../../model/userData")
const mangaDetails= require("../../model/mangadetails")
const cartDetails= require("../../model/cartDetails")
const { redirect } = require("express/lib/response")

router.get('/account',(req,res)=>{
    res.render("account")
})
router.post('/register',async (req,res)=>{
    console.log(req.body.username);
    const user=new userData(
        {
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            typed:"user"
        }

    )
    user.save()
    res.redirect("account")
})

router.post('/LandingPage',async (req,res)=>{
    const filter={};
    const userName=req.body.username
    const all=await mangaDetails.find(filter)
    userData.findOne({ 'username': req.body.username } , function (err, user) {
        // console.log(user.password,req.body.password);
        // console.log(user);
        if (err) return handleError(err);
        if(req.body.password==user.password && req.body.type=="User"){            
            req.session.username=userName
            cartDetails.deleteMany({ username: userName }, err => {
                console.log("Cart refreshed")
            })
            res.render("LandingPage",{details:all})
        }
        else if(req.body.password==user.password && user.typed=="admin" && req.body.type=="Admin" ){
            req.session.username=userName
            console.log("admin logging in");
            res.render("adminLanding",{details:all})
        }
        else if(user.typed!="admin" && req.body.type=="Admin"){
            res.render("account",{error:"Not admin account"})
        } 
        else{
            res.render("account",{error:"Username and Password does not match"})
        }
    });
    
})
router.get('/editAccount',(req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    else{
        res.render("EditAccount")
    }
    
})
router.post('/editAccount', async (req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    else{
        userData.findOne({ username: req.body.username }, async function  (err, user) {
            // console.log(user.password);
            // console.log(req.body.password,".")
            // console.log(user.password,".");
            // console.log(user)
            if(req.body.password==user.password){
                const wait1= await userData.deleteMany({ username:req.body.username, email:req.body.email}); 
                const user1=new userData(
                    {
                        username:req.body.username,
                        email:req.body.email,
                        password:req.body.password2,
                        typed:"user"
                    }
            
                )
                user1.save()
                console.log(user1)
                res.render("EditAccount",{error:"Password updated successfully"})
            }
            
            else{
                res.render("EditAccount",{error:"The email/current Password does not match"})
                   }
        });
    }
    
})

router.get('/LandingPage',async (req,res)=>{
    console.log("in");
    if(!req.session.username){
        req.session.destroy(err=>{
            res.render("account")
        })
        
    }
    const filter={};
    const all=await mangaDetails.find(filter)
    res.render("LandingPage",{details:all})   
})
    
router.get('/adminLanding',async (req,res)=>{
    console.log("admin landing");
    if(!req.session.username){
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    
    const filter={};
    const all=await mangaDetails.find(filter)
    console.log("admin in");        
    res.render("adminLanding",{details:all}) 
    
    
})
router.post('/addAccount',async (req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    else{
        const user=new userData(
            {
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                typed:"admin",
            }
        )
        user.save()
        res.render("addAdmin",{success:"New Admin Created"} ) 
        res.redirect("addAdmin")
    }
    
})
router.get('/addAccount',(req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    else{
        res.render("addAdmin")
    }
    
})
router.post('/logout', async (req,res)=>{
    req.session.destroy(err=>{
            res.render("account")    
    })
})
module.exports = router