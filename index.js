const express = require("express");
const { connection } = require("./database");
const cors = require("cors");
const { userRouter } = require("./controller/userRoutes");
const { menRouter } = require("./controller/menRoutes");
const { womenRouter } = require("./controller/womenRoutes");
const { kidRouter } = require("./controller/kidsRoutes");
const { electronicRouter } = require("./controller/electronicRoutes");
const { homeRouter } = require("./controller/homeRoute");
const { cartRouter } = require("./controller/cartRoutes");
const { authenticator } = require("./middleware/authenticator");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/homes", homeRouter);
app.use("/mens", menRouter);
app.use("/womens", womenRouter);
app.use("/kids", kidRouter);
app.use("/electronics", electronicRouter);
app.use(authenticator);
app.use("/carts", cartRouter);

app.listen(process.env.port, async () => {
  await connection;
  console.log(`Listening to the port ${process.env.port}`);
});
