import pool from './database.js';
class PhotosServices {
    constructor() {
    }
    async getPhotosService() {
        const [result] = await pool.query("SELECT * FROM photos");
        return result;
    }
    async getPhotoService(pid) {
        const [result] = await pool.query(`
            CALL p_get_photo(?)`, [pid]);
        return result;
    }
    async createPhotoService(title, thumbnail, alt, cloudinaryPublicId) {
        const [[[result]]] = await pool.query(`
            CALL p_post_photo(?, ?, ?, ?)`, [title, thumbnail, alt, cloudinaryPublicId]);
        const pid = result["id"];
        return await this.getPhotoService(pid);
    }
    async deletePhotosService(pid) {
        const [[photo]] = await this.getPhotoService(pid);
        await pool.query(`
            CALL p_delete_photo(?)`, [pid]);
        return photo.cloudinaryPublicId;
    }
}
export default PhotosServices;
