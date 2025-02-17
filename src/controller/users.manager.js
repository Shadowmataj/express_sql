import UsersServices from '../services/users.dao.sqldb.js';
const us = new UsersServices();
class usersManager {
    async getUsers() {
        try {
            const result = us.getUsersService();
            return result;
        }
        catch (err) {
            console.log(`Function getUsers: ${err}`);
        }
    }
    async getUserById(pid) {
        try {
            const result = us.getUserByIdService(pid);
            return result;
        }
        catch (err) {
            console.log(`Function getUser: ${err}`);
        }
    }
    async getUserByEmail(email) {
        try {
            const result = us.getUserByEmailService(email);
            return result;
        }
        catch (err) {
            console.log(`Function getUserByEmail: ${err}`);
        }
    }
    async createUser(firstName, lastName, email, birthday, password) {
        try {
            const result = us.createUserService(firstName, lastName, email, birthday, password);
            return result;
        }
        catch (err) {
            console.log(`Function createUser: ${err}`);
        }
    }
    async deleteUsers(pid) {
        try {
            const result = us.deleteUserService(pid);
            return result;
        }
        catch (err) {
            console.log(`Function deleteUsers: ${err}`);
        }
    }
}
export default usersManager;
