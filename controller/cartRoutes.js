const { CartModel } = require("../model/cartModel");
const cartRouter = require("express").Router();
const jwt = require("jsonwebtoken");

cartRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "peter");
  try {
    if (decoded) {
      const data = await CartModel.find({ userID: decoded.id });
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

cartRouter.post("/post", async (req, res) => {
  const cartItem = new CartModel(req.body);
  try {
    const newCartItem = await cartItem.save();
    res.status(200).json({ message: "Added in Cart", data: newCartItem });
  } catch (err) {
    res.status(400).json({ message: "Already present in your Cart" });
  }
});

cartRouter.patch("/update/:_id", async (req, res) => {
  try {
    const updatedCartItem = await CartModel.findByIdAndUpdate(
      req.params,
      req.body
    );
    res.status(200).json(updatedCartItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

cartRouter.delete("/delete/:_id", async (req, res) => {
  try {
    const removedCartItem = await CartModel.findByIdAndRemove(req.params);
    res.json(removedCartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { cartRouter };
