const express = require("express");
require("dotenv").config({ path: "./config/config.env" });
const connectDB = require("./config/database");

connectDB();

const app = express();

const port = process.env.PORT || 8500;

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
