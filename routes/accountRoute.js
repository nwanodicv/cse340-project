const express = require("express")
const router = new express.Router()

// Import controller
const accountController = require("../controllers/accountController")

// Import utilities for error handling
const utilities = require("../utilities/")

/* ***************************
 * Account Routes
 ****************************/

// Deliver registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Deliver login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

/* ***************************
 * Process Registration
 ****************************/
router.post(
  "/register",
  utilities.handleErrors(accountController.registerAccount)
)

/* ***************************
 * Process Login
 ****************************/
router.post(
  "/login",
  utilities.handleErrors(accountController.accountLogin)
)

module.exports = router