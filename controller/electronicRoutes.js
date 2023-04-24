const express = require("express");
const { ElectronicModel } = require("../model/electronicsModel");
const electronicRouter = express.Router();

electronicRouter.get("/", async (req, res) => {
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

    const sortByCategory = ["All", "TV", "Phone", "Laptop"];
    const sortByBrand = [
      "All",
      "Sony",
      "LG",
      "Panasonic",
      "Samsung",
      "Haier",
      "Dell",
      "Lenovo",
      "Asus",
      "Acer",
      "HP",
      "Apple",
      "Realme",
      "Infinix",
      "Nokia",
      "Lava",
      "Poco",
      "Micromax",
      "Motorola",
      "Oppo",
      "OnePlus",
    ];

    category === "All"
      ? (category = [...sortByCategory])
      : (category = req.query.category.split(","));

    brand === "All"
      ? (brand = [...sortByBrand])
      : (brand = req.query.brand.split(","));

    const electronics = await ElectronicModel.find({
      title: { $regex: search, $options: "i" },
    })
      .where("category")
      .in([...category])
      .where("brand")
      .in([...brand])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const response = {
      error: false,
      items: electronics.length,
      page: page + 1,
      limit,
      category: sortByCategory,
      brand: sortByBrand,
      electronics,
    };
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

electronicRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const response = await ElectronicModel.findById(id);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

electronicRouter.post("/post", async (req, res) => {
  const cartItem = new ElectronicModel(req.body);
  try {
    const newCartItem = await cartItem.save();
    res.status(200).json({ message: "Added in the DB", data: newCartItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

electronicRouter.patch("/update/:_id", async (req, res) => {
  try {
    const updatedCartItem = await ElectronicModel.findByIdAndUpdate(
      req.params,
      req.body
    );
    res.status(200).json(updatedCartItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = { electronicRouter };
