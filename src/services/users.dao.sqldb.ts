import pool from "./database.ts"
import { User } from "../types.ts"

class UsersServices{

    constructor(){
    }

    async getUsersService(): Promise<Array<User>>{
        const [result]: Array<any[]>= await pool.query("SELECT userId, firstName, lastName, lastConnection, role, email FROM users")
        return result
    }

    async getUserByIdService(pid: number): Promise<User>{
        const [[[result]]]: any[]= await pool.query(`
            CALL p_get_user_by_id(?)`, [pid])
        return result
    }

    async getUserByEmailService(email: string): Promise<any>{ 
        try {
            const [[[result]]]: any[] = await pool.query(`
                CALL p_get_user_by_email(?)`, [email])
            return result

        }  catch (error) {
            console.log(error)
        }
    }

    async createUserService(firstName: string, lastName: string, email: string, birthday: string, password: string): Promise<User>{
        const [[[result]]]: any[] = await pool.query(`
            CALL p_post_user(?, ?, ?, ?, ?)`, [firstName, lastName, email, birthday, password]
        )
        const pid: number = result["id"]
        return await this.getUserByIdService(pid)
    }

    async deleteUserService(pid: number): Promise<string>{
        const photo: User = await this.getUserByIdService(pid)
        await pool.query(`
            CALL p_delete_user(?)`, [pid])
        return photo.firstName
    }

}

export default UsersServices