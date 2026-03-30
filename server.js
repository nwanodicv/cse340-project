/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const invRoute = require("./routes/inventoryRoute")
const inventoryRoute = require("./routes/inventoryRoute")
const accountRoute = require("./routes/accountRoute")
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const utilities = require("./utilities/")

/* ***********************
 * View Engine and Templates - This section sets up the view engine and templates for the application. It uses EJS as the view engine and sets the views directory to "views". It also uses express-ejs-layouts to manage the layout of the views.
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

app.use(express.urlencoded({ extended: true }))

/* ***********************
 * Routes
 *************************/
app.use(static)// This line tells the application to use the static route for any routes that start with "/static". This means that if a user visits "/static/css/styles.css", the application will use the static route to serve that file.
app.use("/account", accountRoute)// This line tells the application to use the accountRoute for any routes that start with "/account". This means that if a user visits "/account/register", the application will use the accountRoute to handle that request. The accountRoute will then determine which controller function to call based on the specific route (e.g., "/register" or "/login").
app.use("/inv", invRoute)
// Home route - This route renders the index.ejs file when the user visits the home page. It also passes a title variable to the template, which can be used to display the title of the page.

// 
app.use("/inv", inventoryRoute)

//app.get("/",(baseController.buildHome)
app.get("/", utilities.handleErrors(baseController.buildHome))

/* ******************************************
 * Intentional Error Route (Task 3)
 ******************************************/
app.get("/error", baseController.triggerError)

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
/**app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})*/


/* ***********************
 * Local Server Information - Server name and port
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST || "localhost"
/* ***********************
 * Log statement to confirm server operation - The below code is our local server information and a log statement to confirm that the server is running. The server will be running on the port and host specified in the .env file.
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
