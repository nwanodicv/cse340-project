/* ******************************************
 * Inventory Routes
 * Handles all inventory-related routes
 ******************************************/

// Require Express
const express = require("express")


// Create router object
const router = new express.Router()

// Import inventory controller
const invController = require("../controllers/inventoryController")

/* ******************************************
 * Route to build vehicle detail view
 * Example URL: /inv/detail/3
 ******************************************/
router.get("/detail/:inv_id", invController.buildByInventoryId)

/* ******************************************
 * Route for classification view
 * Example: /inv/type/1
 ******************************************/
router.get("/type/:classification_id", invController.buildByClassificationId)

/* ******************************************
 * Management View Route
 * URL: /inv/
 ******************************************/
router.get("/", invController.buildManagement)

/* ******************************************
 * Deliver Add Classification View
 ******************************************/
router.get("/add-classification", invController.buildAddClassification)

/* ******************************************
 * Process Add Classification
 ******************************************/
router.post(
  "/add-classification",
  require("../utilities/").handleErrors(invController.addClassification)
)

/* ******************************************
 * Deliver Add Inventory View
 ******************************************/
router.get("/add-inventory", invController.buildAddInventory)

/* ******************************************
 * Process Add Inventory
 ******************************************/
router.post(
  "/add-inventory",
  require("../utilities/").handleErrors(invController.addInventory)
)


// Export router
module.exports = router