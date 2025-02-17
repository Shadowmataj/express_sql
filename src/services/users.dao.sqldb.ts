import pool from "./database.js"



class UsersServices{

    constructor(){
    }

    async getUsersService(): Promise<any>{
        const [result]: any[]= await pool.query("SELECT * FROM users")
        return result
    }

    async getUserByIdService(pid: number): Promise<any>{
        const [result]: any[]= await pool.query(`
            CALL p_get_user(?)`, [pid])
        return result
    }

    async getUserByEmailService(email: string): Promise<object>{ 
        const [result]: any[] = await pool.query(`
            CALL p_get_user_by_email(?)`, [email])
        return result
    }

    async createUserService(firstName: string, lastName: string, email: string, birthday: string, password: string): Promise<any>{
        const [[[result]]]: any[] = await pool.query(`
            CALL p_post_user(?, ?, ?, ?, ?)`, [firstName, lastName, email, birthday, password]
        )
        
        const pid: number = result["id"]
        return await this.getUserByIdService(pid)
    }

    async deleteUserService(pid: number): Promise<string>{
        const [[photo]]: any[] = await this.getUserByIdService(pid)
        await pool.query(`
            CALL p_delete_user(?)`, [pid])
        return photo.firstName
    }

}

export default UsersServices