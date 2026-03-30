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
    res.render("./inventory/detail", {
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

    res.render("./inventory/classification", {
      title: "Vehicle Classification",
      nav,
      inventoryList
    })

  } catch (error) {
    next(error)
  }
}

/* ******************************************
 * Build Management View
 ******************************************/
invController.buildManagement = async function (req, res) {
  const utilities = require("../utilities/")
  let nav = await utilities.getNav()

  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    message: req.flash ? req.flash("notice") : null
  })
}

/* ******************************************
 * Build Add Classification View
 ******************************************/
invController.buildAddClassification = async function (req, res) {
  let nav = await utilities.getNav()

  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    message: null
  })
}

/* ******************************************
 * Process Add Classification
 ******************************************/
invController.addClassification = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  // SIMPLE SERVER VALIDATION
  const nameRegex = /^[A-Za-z0-9]+$/

  if (!classification_name || !nameRegex.test(classification_name)) {
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      message: "Invalid classification name. No spaces or special characters allowed."
    })
  }

  // Insert into DB
  const result = await invModel.addClassification(classification_name)

  if (result) {
    // SUCCESS → go to management page
    return res.render("inventory/management", {
      title: "Inventory Management",
      nav: await utilities.getNav(), // refresh nav
      message: "Classification added successfully!"
    })
  } else {
    // FAIL → stay on form
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      message: "Failed to add classification."
    })
  }
}

/* ******************************************
 * Build Add Inventory View
 ******************************************/
invController.buildAddInventory = async function (req, res) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()

  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classificationList,

    // 👇 ADD THESE (important for stickiness)
    inv_make: null,
    inv_model: null,
    inv_year: null,
    inv_description: null,
    inv_image: null,
    inv_thumbnail: null,
    inv_price: null,
    inv_miles: null,
    inv_color: null,
    classification_id: null
  })
}

/* ******************************************
 * Process Add Inventory
 ******************************************/
invController.addInventory = async function (req, res) {
  let nav = await utilities.getNav()

  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  } = req.body

  // SIMPLE SERVER VALIDATION
  if (
    !inv_make ||
    !inv_model ||
    !inv_year ||
    !inv_description ||
    !inv_price ||
    !inv_miles ||
    !inv_color ||
    !classification_id
  ) {
    let classificationList = await utilities.buildClassificationList(classification_id)

    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      message: "All fields are required.",
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color
    })
  }

  // INSERT INTO DB
  const result = await invModel.addInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  )

  if (result) {
    return res.render("inventory/management", {
      title: "Inventory Management",
      nav: await utilities.getNav(),
      message: "Vehicle added successfully!"
    })
  } else {
    let classificationList = await utilities.buildClassificationList(classification_id)

    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      message: "Failed to add vehicle.",
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color
    })
  }
}

// Export controller
module.exports = invController