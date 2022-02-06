const Cart = require("../model/Cart");
const verify = require("../routes/verifyToken")

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newCart = new Cart({
        id:req.body.id,
        name:req.body.name,
        price:req.body.price,
  });

  try {
    const savedCart = await newCart.save();
    res.send(savedCart);
  } catch (err) {
    res.status(400).send(err);
  }
});

//UPDATE
router.put("/:id",  async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(400).json(err);
  }
});

//DELETE
router.delete("/:id",  async (req, res) => {
  try {
    const removeCart = await Cart.findByIdAndRemove(req.params.id);
    res.json(removeCart)
} catch (error) {
   res.json({message:error}) 
}
});

//GET USER CART
router.get("/find/:userId",  async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json(err);
  }
});

// //GET ALL

router.get("/",  async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;