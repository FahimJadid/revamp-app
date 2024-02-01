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

# Step 4: Setting up the Morgan

- Using morgan because it is a HTTP request logger middleware for node.js that logs the requests to the console that helps us to debug the application.

- We want to use morgan only in development mode, so we will use the NODE_ENV environment variable to check if the application is running in development mode or not. If it is running in development mode, we will use morgan to log the requests to the console.

- require() morgan and use it as a middleware in the app.js file.
- Using a conditional statement to check if the application is running in development mode or not. If it is running in development mode, we will use morgan to log the requests to the console.

- Add the following code to the app.js file to activate morgan only in development mode:

```js
const morgan = require("morgan");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
```

# Step 5: Express Handlebars Setup

- Express Handlebars is a view engine for Express that allows us to use Handlebars. We are using Handlebars because it is a simple templating language that allows us to generate HTML markup with plain JavaScript.
- imports the engine function from the express-handlebars module. The engine function is used to create an instance of the Handlebars engine with specified configurations.
- `engine()` method is used to register the express-handlebars view engine with the Express app.
- The `engine()` method takes two arguments: the name of the view engine and a callback function that returns an instance of the view engine.
- `app.engine` to register the Handlebars engine for files with the `.hbs` extension. The second argument to engine is an object that contains configuration options for Handlebars. In this case:

`defaultLayout: "main"` specifies that the main layout file for your views is named `"main.hbs"`.
`extname: ".hbs"` sets the file extension for your views to ".hbs".

- `app.set()` method is used to set the view engine for the Express app. The first argument is the name of the setting, and the second argument is the value of the setting. In this case, we set the view engine to ".hbs". This means that you can render views without specifying the file extension in your routes.

- Add the following code to the app.js file to ebable the express-handlebars view engine:

```js
const { engine } = require("express-handlebars");
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
```

# Step 6: Creating the Layouts

- Create a folder named views in the root directory of the project. This is where we will store the views for our application.
- Inside the views folder, create a folder named layouts. This is where we will store the layout files for our application.
- Create a files named `main.hbs` & `login.hbs` inside the layouts folder. `main.hbs` is the main layout file for our application.

- Add the following code to the main.hbs file:

```hbs
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Revamp</title>
  </head>
  <body>

    <div class="container">
      {{{body}}}
    </div>

  </body>
</html>
```

# Step 7: Routes Setup

- Create a folder named routes in the root directory of the project. This is where we will store the routes for our application.
- Create a file named index.js inside the routes folder. This is where we will define the Top level routes for our application. The Top level routes are generic routes that are not specific to any resource. For example, the home page route is a Top level route.

- Import express and create a router instance with the express.Router() method.
- Use the router object to define the routes for our application.

- Then When a user accesses the root URL of the application with a GET request, this function is called. It uses res.render("Login") to render the "Login" view. This assumes that there is a Handlebars (or other templating engine) view named "Login" in the views folder.

- Same for the dashboard route.

- Export the router object and import it into the app.js file.

- Add the following code to the index.js file:

```js
const express = require("express");

const router = express.Router();

// @desc    Login/Landing page
// @route   GET /

router.get("/", (req, res) => {
  res.render("login");
});

// @desc    Dashboard
// @route   GET /dashboard

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
```

- Add the following code to the app.js file to use the routes:
- This is similar to the way we use middleware in Express. We use the `app.use()` method to use the routes. The first argument is the path for the routes. The second argument is the routes object.

- It's like a Hub for all the routes. It's like listening to all the routes. For example when a request is made to the '/' route, it will be handled by the routes object.

- We are specifying the path for the routes as "/" because when a request is made to the root path from the client side, the routes index.js file will handle the request. We are helping the server to look for the information that it needs.

```js
// Routes
app.use("/", require("./routes/index"));
app.use("/dashboard", require("./routes/index"));
```

# Step 8: Creating the Views

- create login.hbs & dashboard.hbs files inside the views folder. These are the views that will be rendered when the user accesses the root URL of the application and the dashboard route respectively.

# Step 9: Styling the layouts with Materialize CSS & fontawesome

- Add CDN link to the main.hbs file in the layouts folder:

```hbs
<!-- Put at the beginning -->
<!-- Compiled and minified CSS Materialize -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
/>

<!-- fontawesome cdn link -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>

<!--Put At the end -->
<!-- Compiled and minified JavaScript Materialize -->
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
></script>
```

# Step 10: Serving static files:

- Create a folder named public in the root directory of the project. This is where we will store the static files for our application.
- We are setting up a middleware to serve static files from a directory named "public" in your project. It uses the `express.static` middleware, and the absolute path to the "public" directory is determined using `path.join(__dirname, "public")`. This allows files in the "public" directory to be directly accessible through the root URL of your application.
- The path provided to the `express.static` function is relative to the directory from where we launch the node process. If we run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve
- Add the following code to the app.js file to serve static files:

```js
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
```

- Create a folder named css inside the public folder.
- Create a file named `style.css` inside the css folder.
- Link the `style.css` file to the main.hbs file in the layouts folder. Because the `style.css` file is in the css folder, we need to use the path `/css/style.css` to link to it. Because by default, it looks in to the public folder.

# Step 11: Populating the login layout

- Copy the code from the main.hbs file in the layouts folder and paste it into the login.hbs file.
- We are adding some css classes to the body tag to style the login page with built-in Materialize CSS classes.
- Add the following code to the login.hbs file:

```hbs
<body>
  <div class="container login-container">
    <div class="card">
      <div class="card-content">
        {{{body}}}
      </div>
    </div>
  </div>

</body>
```

# Step 12: Updating Routes to use the layouts

- Update the routes in the index.js file in the routes folder to use the layouts.
- We are using the res.render() method to render the views. The first argument is the name of the view. The second argument is an object that contains the data that will be passed to the view. In this case, we are passing the login

- Add the following code to the index.js file:

```js
router.get("/", (req, res) => {
  res.render("login", {
    layout: "login",
  });
});
```

# Step 13: Adding custom CSS

- Add the following code to the style.css file in the css folder:

```css
p {
  margin: 10px 0 !important;
}

.login-container {
  width: 400px;
  margin-top: 50px;
  text-align: center;
}
```

# Step 14: Updating the login view

- Update the login.hbs file in the views folder

- Add the following code to the login.hbs file:

```hbs
<h3><i class="fa-solid fa-clipboard"></i> InkSync</h3>

<div class="section">
  <p class="lead">Create Public and Private Notes</p>
</div>

<div class="section">
  <a href="/auth/google" class="btn red darken-1">
    <i class="fa-brands fa-google left"></i>Login with Google
  </a>
</div>
```

# Step 15: Setting up the Google OAuth

- Go to the Google Cloud Console and create a new project.
- Enable the Google+ API for the project.
- Create OAuth 2.0 credentials for the project.
- Add the client ID and client secret to the config.env file.

# Step 16: Setting up the Passport Configuration

- Create a file named passport.js in the config folder. This is where we will configure the Passport authentication middleware.
- Require passport in app.js and create a new instance of it. And require the passport.js file in the config folder.

- Configuration module for Passport located at "./config/passport" and passes the passport object as an argument to a function exported by that module. The configuration module typically exports a function that takes passport as a parameter and configures Passport strategies, serialization, and deserialization logic.

- The purpose of this configuration is to set up Passport with the necessary settings, strategies, and hooks for authentication.

- Add the Passport initialization & session middleware
- The passport.initialize() middleware is responsible for initializing Passport, while passport.session() is used to support persistent login sessions. Passport will serialize and deserialize user instances to and from the session.

session middleware is crucial for maintaining user authentication state across requests. Passport uses the session to keep track of a user's authenticated state and to store user information.

- Session configuration sets up sessions with a secret for session ID cookie signing, prevents unnecessary session saves with resave: false(This is typically set to false to avoid unnecessary session saves. It's recommended to set it to false unless you need it for specific reasons.), and avoids saving uninitialized sessions with saveUninitialized: false(Setting it to false means that the session will not be saved for requests that did not modify the session data. This can help reduce storage usage for new, uninitialized sessions.).

- **Notes: The order of middlewares is crucial because the session middleware, responsible for managing user sessions and looking up users in the database, must be configured before Passport.js middleware. This is because Passport relies on the session to retrieve user information. If there is no session on the request, Passport won't be able to look up the user in the database. Therefore, placing the session middleware before Passport initialization ensures that the necessary session is available for Passport to function correctly.**

- Add the following code to the app.js file:

```js
const passport = require("passport");
const session = require("express-session");

// Passport config
require("./config/passport")(passport);

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
```

# Step 17: Creating the User Model

- We use models to create objects that we can use to interact with the database.

- Create a folder named models in the root directory of the project. This is where we will store the models for our application.

- Create a file named User.js inside the models folder. We will use the User model to create user objects that we can use to interact with the users collection in the database.

- Define a Mongoose schema for a "User" with properties commonly associated with Google OAuth authentication. The schema defines the shape of documents in the users collection. This schema is suitable for storing user information obtained through Google OAuth authentication. When a user signs in through Google, you can create a new instance of the User model using this schema, populate it with the user's data, and save it to your MongoDB database.

- Create a Mongoose model named "User" based on the specified UserSchema and export the created Mongoose model so that it can be imported and used in other parts.

- By exporting the model, you make it accessible in other files, allowing you to perform CRUD (Create, Read, Update, Delete) operations on the "User" collection in your MongoDB database.

- Add the following code to the User.js Model file:

```js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
```

# Step 18: Passport Google 2.0 Strategy Setup

- Add the following code to the passport.js file in the config folder:

```js
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
      }
    )
  );

  // Serialize and Deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findById(id);
      done(null, user);
    } catch (err) {
      console.log(err);
    }
  });
};
```

- `Google OAuth 2.0 Strategy Configuration:`

- The code sets up a Google OAuth 2.0 authentication strategy using passport-google-oauth20. It configures the strategy with the Google client ID, client secret, and callback URL.

- clientID and clientSecret: These are the credentials obtained from the Google Developers Console when we create a project and enable the Google+ API.

- callbackURL: This is the URL where Google will redirect the user after they have authenticated. In this case, it is set to "/auth/google/callback," so we need to define a route for handling Google callback in the application.

- The strategy's async callback function is executed when a user successfully authenticates with Google. It receives the accessToken, refreshToken, profile, and a done callback.

- The profile object contains information about the authenticated user, and the code uses it to create or find a corresponding user in the local database.

- `User Creation or Retrieval Logic:`

- The code checks if a user with the same Google ID already exists in the local database. If the user exists, it calls done(null, user) to indicate successful authentication. If not, a new user is created using the provided newUser object, and done(null, user) is called.

- `Serialize and Deserialize User Functions:`

- passport.serializeUser: This function is used to determine which data from the user object should be stored in the session. It receives a user object and passes the user's ID to the done callback.

- passport.deserializeUser: This function is used to retrieve the user object based on the stored user ID in the session. It receives the user's ID and passes the user object to the done callback.

# Step 19: Creating the Routes for Google OAuth

- Create a new file named auth.js in the routes folder. This is where we will define the routes for Google OAuth authentication.

- Require express and create a router instance with the express.Router() method.

- `Route for Initiating Google OAuth:` - This route is for the URL path "/google" and is responsible for initiating the Google OAuth 2.0 authentication process when a user accesses this route. It uses the passport.authenticate middleware with the "google" strategy and requests access to the user's profile.

- `Route for Handling Google OAuth Callback:`

- This route is for the URL path "/google/callback" and is designed to handle the callback from Google after the user has authenticated. It uses the passport.authenticate middleware with the "google" strategy.

- If the authentication fails, the user is redirected to the root ("/") path as specified by { failureRedirect: "/" }.
- If the authentication is successful, the callback function redirects the user to the "/dashboard" path.
- Require the auth.js file in the app.js file to use the routes.

- Add the following code to the auth.js file:

```js
const express = require("express");
const passport = require("passport");

const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc    Google Auth Callback
// @route   GET /auth/google/callback

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect dashboard.
    res.redirect("/dashboard");
  }
);

module.exports = router;
```

- Add the following code to the app.js file to use the routes:

```js
app.use("/auth", require("./routes/auth"));
```

# Step 20: Storing Google data in the database

- This specific part is the callback function that gets executed after a user has successfully authenticated with Google.

- `Callback Function Parameters:`

- `(accessToken, refreshToken, profile, done) => { /* ... */ }:`
- This is an asynchronous callback function that receives the following parameters:
  `accessToken:` The access token obtained from Google after successful authentication.
  `refreshToken:` The refresh token that can be used to obtain a new access token.
  `profile:` The user's Google profile, containing information like ID, display name, name(family & given), and photos.
  `done:` A callback function provided by Passport.js to indicate the completion of the authentication process.

- `Creating a New User or Retrieving Existing User:`
- We are attempting to find an existing user in the local database based on the Google ID. If a user is found, the user is passed to the done callback, indicating a successful authentication.

If no user is found, a new user is created using User.create(newUser). The newly created user is then passed to the done callback.

- Add the following code to the passport.js file in the config folder:

```js
async (accessToken, refreshToken, profile, done) => {
  // console.log(profile);
  const newUser = {
    googleId: profile.id,
    displayName: profile.displayName,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    image: profile.photos[0].value,
  };
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (user) {
      done(null, user);
    } else {
      user = await User.create(newUser);
      done(null, user);
    }
  } catch (err) {
    console.log(err);
  }
};
```
