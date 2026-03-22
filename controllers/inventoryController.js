/* ******************************************
 * Inventory Controller
 * Handles inventory-related requests
 ******************************************/

// Import required modules
const invModel = require("../models/inventory-model") // connects to model
const utilities = require("../utilities/") // for navigation and HTML builders

// Create controller object
const invController = {}

/* ******************************************
 * Build inventory detail view by ID
 ******************************************/
invController.buildByInventoryId = async function (req, res, next) {
  try {
    // Get inventory id from URL
    const inv_id = req.params.inv_id

    // Get navigation (for layout)
    const nav = await utilities.getNav()

    // Get vehicle data from database
    const data = await invModel.getInventoryById(inv_id)

    // Build HTML using utility function (we will create this next)
    const vehicleDetail = await utilities.buildVehicleDetail(data)

    // Render the view and pass data
    res.render("inventory/detail", {
      title: `${data.inv_make} ${data.inv_model}`,
      nav,
      vehicleDetail
    })

  } catch (error) {
    next(error) // send error to middleware
  }
}

/* ******************************************
 * Build inventory by classification view
 ******************************************/
invController.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classification_id

    // Get navigation
    const nav = await utilities.getNav()

    // Get inventory data
    const data = await invModel.getInventoryByClassificationId(classification_id)

    // Build HTML list (we’ll create this next)
    const inventoryList = await utilities.buildClassificationGrid(data)

    res.render("inventory/classification", {
      title: "Vehicle Classification",
      nav,
      inventoryList
    })

  } catch (error) {
    next(error)
  }
}

// Export controller
module.exports = invController