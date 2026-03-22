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


// Export router
module.exports = router