const express = require("express");
const { UserModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, email, password, mobile } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({
        username,
        email,
        password: hash,
        mobile,
      });
      await user.save();
      res.status(200).send({ msg: "Registration Successful" });
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    // console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            message: "Login Successful",
            username: user.username,
            token: jwt.sign({ id: user._id }, "peter"),
          });
        }
      });
    } else {
      res.status(400).send({ message: "Wrong Credentials" });
    }
  } catch (err) {
    res.status(400).send({ message: "Wrong Credentials" });
    console.log(err);
  }
});

userRouter.get("/customers", async (req, res) => {
  try {
    const response = await UserModel.find();
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
    console.log(err);
  }
});

userRouter.delete("/delete/:_id", async (req, res) => {
  try {
    const removedCartItem = await UserModel.findByIdAndRemove(req.params);
    res.json(removedCartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { userRouter };
