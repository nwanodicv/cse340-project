const pool = require("../database/")// This code imports the database connection file (named index.js) from the database folder which is one level above the current file. Because the file is index.js, it is the default file, and will be located inside the database folder without being specified. The path could also be ../database/index.js. It would return the same result.

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){// This code creates an "asynchronous" function, named getClassifications. An asynchronous function returns a promise, without blocking (stopping) the execution of the code. It allows the application to continue and will then deal with the results from the promise when delivered.
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")//This code will return (send back) the result of the SQL query, which will be sent to the database server using a pool connection, when the resultset (data) or an error, is sent back by the database server. Notice the two keywords: return and await. Await is part of the Async - Await promise structure introduced in ES6. Return is an Express keyword, indicating that the data should be sent to the code location that called the function originally.
}

/* ***************************
 *  Get inventory item by ID
 * ************************** */
async function getInventoryById(inv_id){
  // This function retrieves a SINGLE vehicle from the inventory table
  // based on the inventory id passed from the URL.
  // It uses a parameterized query to prevent SQL injection.

  try {
    const data = await pool.query(
      "SELECT * FROM public.inventory WHERE inv_id = $1", // SQL query with placeholder
      [inv_id] // value passed safely into query
    )
    return data.rows[0] // return ONLY one record (not an array)
  } catch (error) {
    console.error("getInventoryById error: " + error)
    throw error // allow error middleware to handle it
  }
}

/* ***************************
 *  Get inventory by classification ID
 * ************************** */
async function getInventoryByClassificationId(classification_id){
  // Retrieves all vehicles that belong to a specific classification

  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory 
       WHERE classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error: " + error)
    throw error
  }
}

/* ***************************
 * Add new classification
 * ************************** */
async function addClassification(classification_name) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [classification_name])
  } catch (error) {
    console.error("addClassification error:", error)
    return null
  }
}

/* ***************************
 * Add new inventory item
 * ************************** */
async function addInventory(
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
) {
  try {
    const sql = `
      INSERT INTO inventory (
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
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `
    return await pool.query(sql, [
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
    ])
  } catch (error) {
    console.error("addInventory error:", error)
    return null
  }
}

module.exports = {
  getClassifications,
  addClassification,
  getInventoryById,
  addInventory,
  getInventoryByClassificationId// exporting new function
}//this code exports the function for use elsewhere.