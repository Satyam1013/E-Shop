const express = require("express");
const kidRouter = express.Router();
const { KidsModel } = require("../model/kidsModel");

kidRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit);
    let category = req.query.category || "All";
    let gender = req.query.gender || "All";
    let sort = req.query.sort || "discount_price";
    let search = req.query.search || "";

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    }

    const sortByCategory = [
      "All",
      "T-Shirts",
      "Shirt",
      "Pant",
      "Short",
      "Costume",
      "Lehenga",
      "Toys",
    ];

    const sortByGender = ["All", "Boy", "Girl"];

    category === "All"
      ? (category = [...sortByCategory])
      : (category = req.query.category.split(","));

    gender === "All"
      ? (gender = [...sortByGender])
      : (gender = req.query.gender.split(","));

    const kid = await KidsModel.find({
      title: { $regex: search, $options: "i" },
    })
      .where("category")
      .in([...category])
      .where("gender")
      .in([...gender])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const response = {
      error: false,
      items: kid.length,
      page: page + 1,
      limit,
      category: sortByCategory,
      gender: sortByGender,
      kid,
    };
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

kidRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const response = await KidsModel.findById(id);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


kidRouter.post("/post", async (req, res) => {
  const cartItem = new KidsModel(req.body);
  try {
    const newCartItem = await cartItem.save();
    res.status(200).json({ message: "Added in the DB", data: newCartItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

kidRouter.patch("/update/:_id", async (req, res) => {
  try {
    const updatedCartItem = await KidsModel.findByIdAndUpdate(
      req.params,
      req.body
    );
    res.status(200).json(updatedCartItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = { kidRouter };
