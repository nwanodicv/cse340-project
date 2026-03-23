const { Pool } = require("pg") //This imports the "Pool" functionality from the "pg" package. A pool is a collection of connection objects (10 is the default number) that allow multiple site visitors to be interacting with the database at any given time. This keeps you from having to create a separate connection for each interaction.
require("dotenv").config() //This imports the "dotenv" package which allows the sensitive information about the database location and connection credentials to be stored in a separate location and still be accessed.

/* ***************
 * Detect Environment
 * *************** */
const isProduction = process.env.NODE_ENV === "production" 
// This checks if the app is running in production (Render)

/* ***************
 * Connection Pool
 * SSL Object needed for local testing of app
 * But will cause problems in production environment
 * If - else will make determination which to use
 * *************** */
let pool //This code creates a local pool variable to hold the functionality of the "Pool" connection.
if (process.env.NODE_ENV == "production") { //an if test to see if the code exists in a developent environment, as declared in the .env file. In the production environment, no value will be found.
  pool = new Pool({ //This code creates a new pool instance from the imported Pool class.
    connectionString: process.env.DATABASE_URL, //This code indicates how the pool will connect to the database (use a connection string) and the value of the string is stored in a name - value pair, which is in the .env file locally, and in an "environment variable" on a remote server. These are equivelent concepts, but different implementations.
    ssl: isProduction // This code indicates that the connection to the database will be secure (ssl) if the app is running in production, but not in development. This is because the remote database requires a secure connection, but the local database does not. The ssl object is needed for local testing of the app, but will cause problems in the production environment if included there. The if - else structure makes the determination of which to use based on the environment.
    ?{ // This Lines 13 through 15 - describes how the Secure Socket Layer (ssl) is used in the connection to the database, but only in a remote connection, as exists in our development environment.
      rejectUnauthorized: false,
    }
    :false,
}) //This ends the pool function started on line 11.

// Added for troubleshooting queries
// during development
module.exports = {//exports an asynchronous query function that accepts the text of the query and any parameters. When the query is run it will add the SQL to the console.log. If the query fails, it will console log the SQL text to the console as an error. This code is primarily for troubleshooting as you develop. As you test the application in your development mode, have the terminal open, and you will see the queries logged into the terminal as each is executed.
  async query(text, params) {
    try {
      const res = await pool.query(text, params)
      console.log("executed query", { text })
      return res
    } catch (error) {
      console.error("error in query", { text })
      throw error
    }
  },
}
} else { //ends the if and opens the else structure.
  pool = new Pool({ //creates a new "pool" instance from the "Pool" class.
    connectionString: process.env.DATABASE_URL, //indicates the value of the connection string will be found in an environment variable. In the production environment, such a variable will not be stored in our .env file, but in the server's settings.
  })
  module.exports = pool //exports the pool object to be used whenever a database connection is
}