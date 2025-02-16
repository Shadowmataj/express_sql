import mysql from 'mysql2'

import config from '../config.js'

let pool = mysql.createPool({
    host: config.HOST,
    user: config.MYSQL_USER,
    database: config.MYSQL_DATABASE
}, err => {
    if(err) console.log(err)
    console.log("Connected to the database")
}).promise()

export default pool