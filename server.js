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
const static = require("./routes/static")


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

// Home route - This route renders the index.ejs file when the user visits the home page. It also passes a title variable to the template, which can be used to display the title of the page.
app.get("/", (req, res) => {
  res.render("index", { title: "Home" })
})

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
