import mysql from 'mysql2'

import config from '../config.ts'

const access: any = {
    host: config.HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE
}

const pool = mysql.createPool(access).promise()

export default pool