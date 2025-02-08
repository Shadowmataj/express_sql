import mysql from "mysql2"
import config from "../config.js"



class PhotosServices{

    constructor(){
        this.pool = mysql.createPool({
            host: config.HOST,
            user: config.MYSQL_USER,
            password: config.MYSQL_PASSWORD,
            database: config.MYSQL_DATABASE
        }).promise()
    }

    async getPhotosService(){
        const [result] = await this.pool.query("SELECT * FROM photos")
        return result
    }

    async getPhotoService(pid){
        const [result] = await this.pool.query(`
            SELECT * 
            FROM photos
            WHERE id = ?`, [pid])
        return result
    }

    async createPhotoService(title, thumbnails, alt){
        const [result] = await this.pool.query(`
            INSERT INTO photos (title, thumbnails, alt)
            VALUES (?, ?, ?)`, [title, thumbnails, alt]
        )
        
        const pid = result.insertId
        return this.getPhotoService(pid)
    }

    async deletePhotosService(pid){
        const photo = this.getPhotoService(pid)
        await this.pool.query(`
            DELETE FROM photos
            WHERE id = ?`, [pid])
            return photo
    }

}

export default PhotosServices