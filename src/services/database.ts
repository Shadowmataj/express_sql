import mysql, {PoolOptions} from 'mysql2'

import config from '../config.js'

const access: PoolOptions = {
    host: config.HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE
}

const pool = mysql.createPool(access).promise()

export default pool