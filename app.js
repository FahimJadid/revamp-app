const express = require("express");
require("dotenv").config({ path: "./config/config.env" });
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const connectDB = require("./config/database");
connectDB();

const app = express();

// Morgan logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

const port = process.env.PORT || 8500;

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
