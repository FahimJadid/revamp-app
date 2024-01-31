const express = require("express");
require("dotenv").config({ path: "./config/config.env" });
const path = require("path");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/database");

connectDB();

// Passport config
require("./config/passport")(passport);

const app = express();

// Morgan logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));

const port = process.env.PORT || 8500;

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
