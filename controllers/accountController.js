const bcrypt = require("bcryptjs")
const accountModel = require("../models/account-model")
const utilities = require("../utilities/")

const accountController = {}

/* ***************************
 * Build Register View
 **************************** */
accountController.buildRegister = async function (req, res) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav
  })
}

/* ***************************
 * Build Login View
 **************************** */
accountController.buildLogin = async function (req, res) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav
  })
}

/* ***************************
 * Process Registration
 **************************** */
accountController.registerAccount = async function (req, res) {

  let nav = await utilities.getNav()

  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password
  } = req.body

  // Hash the password
  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(account_password, 10)
  } catch (error) {
    console.error("Hashing error:", error)
    return res.render("account/register", {
      title: "Register",
      nav,
      message: "Sorry, there was an error processing your request."
    })
  }

  // Store account in database
  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    return res.render("account/login", {
      title: "Login",
      nav,
      message: "Registration successful. Please login."
    })
  } else {
    return res.render("account/register", {
      title: "Register",
      nav,
      message: "Registration failed. Please try again."
    })
  }
}

/* ***************************
 * Process Login
 **************************** */
accountController.accountLogin = async function (req, res) {

  const { account_email, account_password } = req.body

  let nav = await utilities.getNav()

  console.log("Login Data:", req.body)

  res.render("account/login", {
    title: "Login",
    nav,
    message: "Login attempted (not yet functional)."
  })
}

module.exports = accountController