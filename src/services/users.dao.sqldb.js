import pool from "./database.js";
class UsersServices {
    constructor() {
    }
    async getUsersService() {
        const [result] = await pool.query("SELECT * FROM users");
        return result;
    }
    async getUserByIdService(pid) {
        const [result] = await pool.query(`
            CALL p_get_user(?)`, [pid]);
        return result;
    }
    async getUserByEmailService(email) {
        const [result] = await pool.query(`
            CALL p_get_user_by_email(?)`, [email]);
        return result;
    }
    async createUserService(firstName, lastName, email, birthday, password) {
        const [[[result]]] = await pool.query(`
            CALL p_post_user(?, ?, ?, ?, ?)`, [firstName, lastName, email, birthday, password]);
        const pid = result["id"];
        return await this.getUserByIdService(pid);
    }
    async deleteUserService(pid) {
        const [[photo]] = await this.getUserByIdService(pid);
        await pool.query(`
            CALL p_delete_user(?)`, [pid]);
        return photo.firstName;
    }
}
export default UsersServices;
