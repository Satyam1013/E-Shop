const express = require("express");
const menRouter = express.Router();
const { MenModel } = require("../model/menModel");

menRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit);
    let category = req.query.category || "All";
    let brand = req.query.brand || "All";
    let sort = req.query.sort || "discount_price";
    let search = req.query.search || "";

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    }

    const sortByCategory = [
      "All",
      "Shirt",
      "T-Shirt",
      "Pants",
      "Jeans",
      "Shorts",
      "Shoes",
      "Sandal",
      "Watches",
    ];

    const sortByBrand = [
      "All",

      "US POLO",
      "VeBNoR",
      "EyeBogler",
      "BLIVE",
      "LEVI'S",
      "PUMA",
      "Raymond",

      "Spykar",
      "Peter England",
      "Nonstrum",
      "Lee Cooper",
      "Wrangler",
      "Calvin Klien",

      "Sparx",
      "asian",
      "BIRDE",
      "Nike",
      "Adidas",
      "Funcky",

      "Armani",
      "Sonata",
      "Titan",
      "Fastrack",
    ];

    category === "All"
      ? (category = [...sortByCategory])
      : (category = req.query.category.split(","));

    brand === "All"
      ? (brand = [...sortByBrand])
      : (brand = req.query.brand.split(","));

    const men = await MenModel.find({
      title: { $regex: search, $options: "i" },
    })
      .where("category")
      .in([...category])
      .where("heading")
      .in([...brand])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const response = {
      error: false,
      items: men.length,
      page: page + 1,
      limit,
      category: sortByCategory,
      brand: sortByBrand,
      men,
    };
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
menRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const response = await MenModel.findById(id);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

menRouter.post("/post", async (req, res) => {
  const cartItem = new MenModel(req.body);
  try {
    const newCartItem = await cartItem.save();
    res.status(200).json({ message: "Added in the DB", data: newCartItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

menRouter.patch("/update/:_id", async (req, res) => {
  const id = req.params._id;
  try {
    const updatedCartItem = await MenModel.findByIdAndUpdate(id, req.body);
    res.status(200).json(updatedCartItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = { menRouter };
