const mysql = require('mysql2')
require('dotenv').config()
const urlDB =
  'mysql://root:QOJEnAdduetZX2bTpXlc@containers-us-west-155.railway.app:6133/railway'
const connection = mysql.createConnection({
  host: process.env.host,
  port: process.env.portdb,

  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
})

module.exports = connection
