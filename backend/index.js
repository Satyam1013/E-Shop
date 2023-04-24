const express = require("express");
const { connection } = require("./database");
const cors = require("cors");
const { userRouter } = require("./routes/userRoutes");
const { menRouter } = require("./routes/menRoutes");
const { womenRouter } = require("./routes/womenRoutes");
const { kidRouter } = require("./routes/kidsRoutes");
const { electronicRouter } = require("./routes/electronicRoutes");
const { homeRouter } = require("./routes/homeRoute");
const { cartRouter } = require("./routes/cartRoutes");
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
