import pool from "./database.ts"
import { User } from "../types.ts"

class UsersServices{

    constructor(){
    }

    async getUsersService(): Promise<Array<Partial<User>>>{
        const [result]: Array<any[]>= await pool.query("SELECT userId, firstName, lastName, lastConnection, role, email FROM users")
        return result
    }

    async getUserByIdService(pid: number): Promise<Partial<User|undefined>>{
        const [[[result]]]: any[]= await pool.query(`
            CALL p_get_user_by_id(?)`, [pid])
        return result
    }

    async getUserByEmailService(email: string): Promise<User|undefined>{ 
        const [[[result]]]: any[] = await pool.query(`
            CALL p_get_user_by_email(?)`, [email])
        return result
    }

    async createUserService(firstName: string, lastName: string, email: string, birthday: string, hashedPassword: string): Promise<Partial<User>|undefined>{
        const user = await this.getUserByEmailService(email)
        
        if(user) throw new Error("User already exists.")

        const [[[result]]]: any[] = await pool.query(`
            CALL p_post_user(?, ?, ?, ?, ?)`, [firstName, lastName, email, birthday, hashedPassword]
        )

        const pid: number = result["id"]
        return await this.getUserByIdService(pid)
    }

    async deleteUserService(pid: number): Promise<string|undefined>{
        const user: Partial<User|undefined> = await this.getUserByIdService(pid)
        await pool.query(`
            CALL p_delete_user(?)`, [pid])
        return user?.firstName
    }

}

export default UsersServices