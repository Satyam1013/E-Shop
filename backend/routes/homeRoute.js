const express = require("express");
const { HomeModel } = require("../model/homeModel");
const homeRouter = express.Router();

homeRouter.get("/", async (req, res) => {
  try {
    const home = await HomeModel.find();
    res.status(200).send(home);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = { homeRouter };
