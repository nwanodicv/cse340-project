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
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const utilities = require("./utilities/")

/* ***********************
 * View Engine and Templates - This section sets up the view engine and templates for the application. It uses EJS as the view engine and sets the views directory to "views". It also uses express-ejs-layouts to manage the layout of the views.
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use(static)
app.use("/inv", invRoute)

// Home route - This route renders the index.ejs file when the user visits the home page. It also passes a title variable to the template, which can be used to display the title of the page.

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
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation - The below code is our local server information and a log statement to confirm that the server is running. The server will be running on the port and host specified in the .env file.
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
