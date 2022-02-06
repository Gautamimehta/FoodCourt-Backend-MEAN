const router = require("express").Router();
const verify = require("../routes/verifyToken")

const Listing = require("../model/Listing");
// Add new food item
router.post("/",verify,async (req,res)=>{
    const listing = new Listing({
        id:req.body.id,
        name:req.body.name,
        price:req.body.price,
        tags:req.body.tags,
        stars:req.body.stars,
        imageUrl:req.body.imageUrl,
        origins:req.body.origins,
        cookTime:req.body.cookTime
    });
    try{
        const savedListing = await listing.save();
        res.send(savedListing);

    }catch(error){
        res.status(400).send(error)
    }
});

// get all food items
router.get("/",async (req,res)=>{
    try {
        const listings = await Listing.find();
        res.json(listings)
    } catch (error) {
       res.json({message:error}) 
    }
});

// Single food item
router.get("/:listingId",async (req,res)=>{
    try {
        const listing = await Listing.findById(req.params.listingId);
        res.json(listing)
    } catch (error) {
       res.json({message:error}) 
    }
});

// Update food item
router.put("/:listingId",verify,async (req,res)=>{
    try {
        const listing = {
            id:req.body.id,
            name:req.body.name,
            price:req.body.price,
            tags:req.body.tags,
            stars:req.body.stars,
            imageUrl:req.body.imageUrl,
            origins:req.body.origins,
            cookTime:req.body.cookTime
        };
        const updateListing = await Listing.findByIdAndUpdate({_id:req.params.listingId},listing)
        res.json(updateListing)
    } catch (error) {
       res.json({message:error}) 
    }
});

// Delete food item
router.delete("/:listingId",verify,async (req,res)=>{
    try {
        const removeListing = await Listing.findByIdAndRemove(req.params.listingId);
        res.json(removeListing)
    } catch (error) {
       res.json({message:error}) 
    }
});

module.exports = router;
