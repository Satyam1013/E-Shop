const express = require("express");
const womenRouter = express.Router();
const { WomenModel } = require("../model/womenModel");

womenRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit);
    let category = req.query.category || "All";
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
      "Bra",
      "Kurta",
      "Top",
      "Saree",
      "Panty",
      "Shoes",
      "Sandal",
      "Watch",
    ];
    category === "All"
      ? (category = [...sortByCategory])
      : (category = req.query.category.split(","));

    const women = await WomenModel.find({
      title: { $regex: search, $options: "i" },
    })
      .where("category")
      .in([...category])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const response = {
      error: false,
      items: women.length,
      page: page + 1,
      limit,
      category: sortByCategory,
      women,
    };
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

womenRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const response = await WomenModel.findById(id);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

womenRouter.post("/post", async (req, res) => {
  const cartItem = new WomenModel(req.body);
  try {
    const newCartItem = await cartItem.save();
    res.status(200).json({ message: "Added in the DB", data: newCartItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

womenRouter.patch("/update/:_id", async (req, res) => {
  try {
    const updatedCartItem = await WomenModel.findByIdAndUpdate(
      req.params,
      req.body
    );
    res.status(200).json(updatedCartItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = { womenRouter };
