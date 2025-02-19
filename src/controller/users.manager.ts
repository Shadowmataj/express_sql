import UsersServices from '../services/users.dao.sqldb.ts'

const us = new UsersServices()

class UsersManager{

    async getUsers(){
        try{
            return us.getUsersService()
        }catch(err){
            console.log(`Function getUsers: ${err}`)
        }
    }

    async getUserById(pid: number){
        try{
            return us.getUserByIdService(pid)
        }catch(err){
            console.log(`Function getUser: ${err}`)
        }
    }

    async getUserByEmail(email: string){
        try{
            return us.getUserByEmailService(email)
        }catch(err){
            console.log(`Function getUserByEmail: ${err}`)
        }
    }

    async createUser(firstName: string, lastName: string, email: string, birthday: string, password: string){
        try{
            const result = us.createUserService(firstName, lastName, email, birthday, password)
            return result
        }catch(err){
            console.log(`Function createUser: ${err}`)
        }
    }

    async deleteUsers(pid: number){
        try{
            const result = us.deleteUserService(pid)
            return result
        }catch(err){
            console.log(`Function deleteUsers: ${err}`)
        }
    }

}

export default UsersManager