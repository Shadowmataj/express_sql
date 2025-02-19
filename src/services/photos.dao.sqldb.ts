import pool from './database.ts'
import { Photo } from '../types.ts'


class PhotosServices{

    constructor(){
    }

    async getPhotosService(): Promise<Array<Photo>>{
        const [result]: any[] = await pool.query("SELECT * FROM photos")
        return result
    }

    async getPhotoService(pid: number): Promise<Photo>{
        const [[[result]]]: any[] =  await pool.query(`
            CALL p_get_photo(?)`, [pid])
        return result
    }

    async createPhotoService(title: string, thumbnail: string, alt: string, cloudinaryPublicId: string): Promise<Photo>{
        const [[[result]]]: any[] = await pool.query(`
            CALL p_post_photo(?, ?, ?, ?)`, [title, thumbnail, alt, cloudinaryPublicId]
        )
        const pid: number = result["id"]
        return await this.getPhotoService(pid)
    }

    async deletePhotosService(pid: number): Promise<string|undefined>{
        const photo: Photo = await this.getPhotoService(pid)
        await pool.query(`
            CALL p_delete_photo(?)`, [pid])
        return photo.cloudinaryPublicId
    }

}

export default PhotosServices