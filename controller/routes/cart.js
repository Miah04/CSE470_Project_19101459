const express=require("express")
const router= express.Router()

const userData= require("../../model/userData")
const mangaDetails= require("../../model/mangadetails")
const cartDetails= require("../../model/cartDetails")
const { redirect } = require("express/lib/response")

//adding cart item to a cart initialized after every login
router.post('/cart',async (req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    else{
        const filter={name:req.body.name,volume:req.body.vol };
        const all=await mangaDetails.find(filter);
        console.log(all);
        const inCart=await cartDetails.find(filter);
        let quant=1;
        console.log(inCart);
        if(inCart!=[]){
            quant=inCart.quantity+1
        }
        const cart=new cartDetails(
            {
                username:req.session.username,
                name:all[0].name,
                author:all[0].author,
                type:all[0].type,
                volume:all[0].volume,
                status:all[0].status,
                genre:all[0].genre,
                theme:all[0].theme,
                demographic:all[0].demographic,
                image:all[0].image,
                price:all[0].price,
                quantity:1,    
            }
        )
        await cart.save()
        console.log(cart);
        res.render("MangaDetails",{details:all[0], success: "Successfully added to cart."})
    }
    
})
//rendering to the cart page
router.get('/cart',async (req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    else{
        const filter={username:req.session.username};
        const all=await cartDetails.find(filter);
        console.log("from back",all)
        res.render("shoppingCart",{details:all});
    }
    
})
//remove one item from cart
router.post('/remove',async (req,res)=>{
    if(!req.session.username){
        
        req.session.destroy(err=>{
            res.render("account")
        })
    }
    const wait1= await cartDetails.deleteOne({ name:req.body.name, username:req.body.username, volume:req.body.vol }); 
    const filter={username:req.session.username};
    console.log(wait1);
    const all=await cartDetails.find(filter);
    if (wait1){
        res.render("shoppingCart",{success:"One entry successfully deleted",details:all})
    }
})
module.exports = router