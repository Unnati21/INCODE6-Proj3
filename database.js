// Loading and initialising the library- option would go in the empty bracket if we had any
const pgp = require('pg-promise')()

// conection string
const cn = 'postgres://postgres:123456@localhost:5432/mr_coffee_schedule'


//Create a new database instance
const db = pgp(cn)

module.exports = db