const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* ****************************************
 * Build Vehicle Detail HTML
 **************************************** */
Util.buildVehicleDetail = async function (data) {
  // This function receives a single vehicle object
  // and builds structured HTML to display in the detail view

  // Format price as US currency (e.g., $16,999)
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(data.inv_price)

  // Format mileage with commas (e.g., 74,750)
  const miles = new Intl.NumberFormat("en-US").format(data.inv_miles)

  // Build HTML string
  let html = ""

  html += '<div class="vehicle-detail-container">'

  // Image section
  html += '<div class="vehicle-image">'
  html += `<img src="${data.inv_image}" alt="Image of ${data.inv_make} ${data.inv_model}">`
  html += '</div>'

  // Details section
  html += '<div class="vehicle-info">'
  html += `<h2>${data.inv_make} ${data.inv_model}</h2>`
  html += `<p><strong>Price:</strong> ${price}</p>`
  html += `<p><strong>Year:</strong> ${data.inv_year}</p>`
  html += `<p><strong>Mileage:</strong> ${miles} miles</p>`
  html += `<p><strong>Color:</strong> ${data.inv_color}</p>`
  html += `<p><strong>Description:</strong> ${data.inv_description}</p>`
  html += '</div>'

  html += '</div>'

  return html
}

/* ****************************************
 * Build Classification Grid HTML
 **************************************** */
Util.buildClassificationGrid = async function (data) {
  let html = '<div class="classification-grid">'

  data.forEach(vehicle => {
    html += '<div class="vehicle-card">'

    html += `<a href="/inv/detail/${vehicle.inv_id}">`
    html += `<img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">`
    html += `<h3>${vehicle.inv_make} ${vehicle.inv_model}</h3>`
    html += `</a>`

    html += `<p>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</p>`

    html += '</div>'
  })

  html += '</div>'
  return html
}

/* ****************************************
 * Build Classification Dropdown List
 **************************************** */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'

  classificationList += "<option value=''>Choose a Classification</option>"

  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'

    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }

    classificationList += ">" + row.classification_name + "</option>"
  })

  classificationList += "</select>"

  return classificationList
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util