# Step 1:

## Initialize project with:

- npm init -y (y for yes to all questions)

## Install dependencies:

- `npm i express` (express is a web framework for node.js to build web applications and API's)
- `npm i mongoose` (mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment)
- `npm i connect-mongo` (connect-mongo is a MongoDB session store so that if the server restarts, the user doesn't have to log in again)
- `npm i express-session` (express-session is a middleware that allows us to store the session data on the server side )
- `npm i express-handlebars` (express-handlebars is a view engine for express that allows us to use handlebars )
- `npm i dotenv` (dotenv is a zero-dependency module that loads environment variables from a .env file into process.env)
- `npm i method-override` (method-override is a middleware that allows us to use HTTP verbs such as PUT or DELETE in places where the client doesn't support it. Because by default, only GET and POST requests are allowed)
- `npm i moment` (moment is a JavaScript date library for parsing, validating, manipulating, and formatting dates)
- `npm i morgan` (morgan is a HTTP request logger middleware for node.js that logs the requests to the console that helps us to debug the application)
- `npm i passport` (passport is an authentication middleware for node.js that authenticates requests)
- `npm i passport-google-oauth20` (passport-google-oauth20 is a passport strategy for authenticating with Google using the OAuth 2.0 API like logging/registering with Google)

## Install dev dependencies:

Dev dependencies are only used during development and not in production.

- `npm i -D nodemon` (nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected)

- `npm i -D cross-env` (cross-env is a Node.js package that allows you to set environment variables in a cross-platform way. It is particularly useful for ensuring consistent behavior across different operating systems, such as Windows, Linux, and macOS, when setting environment variables for scripts in your package.json file)

## Change Scripts in package.json:

```json
  "scripts": {
    "start": "cross-env NODE_ENV=production node app",
    "dev": "cross-env NODE_ENV=development nodemon app"
  },
```

# Step 2: Configure the app & environment variables

## Create app.js file and config.env file:

- Import express and create an instance of it.
- Use the dotenv package to load the environment variables from the config.env file.
- Set the port to the environment variable PORT or 8500.
- Use the listen method to start the server on the specified port. It also logs the server running in the specified mode and port.

- Add the following code to the app.js file:

```js
const express = require("express");
require("dotenv").config({ path: "./config/config.env" });
const app = express();

const port = process.env.PORT || 8500;

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
```

- Add the following code to the config.env file:

```env
PORT = 8000

MONGO_URI = mongodb+srv://accountName:<password>@cluster0.d4caxty.mongodb.net/revamp?retryWrites=true&w=majority
```

# Step 3: Database Setup

## Create a file name database.js in the config folder:

- Mongoose requires a connection to a MongoDB database. require() mongoose and connect to Mongo Atlas database with mongoose.connect() using the MONGO_URI environment variable.
- Create an async function called connectDB that connects to the database and logs a message if the connection is successful or an error message if the connection fails.
- Database APIs are asynchronous section, The async keyword indicates that this function will contain asynchronous operations; and here we await on the promise returned by the connect() method within an async function and console.log the connection host if the connection is successful.
- If there is an error during the connection attempt, the catch block is executed. It logs an error message to the console, including the error message itself. After logging the error, the process is exited with a non-zero status code (process.exit(1)) to indicate an error.
- Export the connectDB function and import it into the app.js file.

- Add the following code to the database.js file:

```js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected at Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```
