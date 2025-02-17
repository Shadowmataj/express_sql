import * as chai from "chai";
import UsersServices from "../src/services/users.dao.sqldb.ts";

const usersDao = new UsersServices()
const expect = chai.expect
let userId = 0
let testUser = {firstName: "Pepe", lastName:"Pecas", email: "pepe@gmail.com", birthday: "1999-02-24", password: "test1234"} 

describe("Test DAO users", function () {
    
    // It's run BEFORE the tests suite.
    before(function () {
    })
    // It's run BEFORE EACH TEST.
    beforeEach(function () { })
    // It's run AFTER the tests suite.
    after(function () { 
    })
    // It's run AFTER EACH TEST.
    afterEach(function () { })
    
    it("createUserService(), create a user in the db. ", async function () {
        const [[result]]: any = await usersDao.createUserService(testUser.firstName, testUser.lastName, testUser.email, testUser.birthday, testUser.password)
        expect(result).to.be.an("object")
        userId = result.userId
        expect(result).to.have.property("firstName").to.be.equal(testUser.firstName)    
        expect(result).to.have.property("lastName").to.be.equal(testUser.lastName)
        expect(result).to.have.property("email").to.be.equal(testUser.email)
        expect(result).to.have.property("birthdate")
        expect(result).to.have.property("password")
        expect(result).to.have.property("lastConnection")
        expect(result).to.have.property("role")
    })
    
    it("getUsersService(), retrive an array with users. ", async function () {
        const result = await usersDao.getUsersService()
        expect(result).to.be.an("array")
    })

    it("getUserByIdService(), retrive an object with the specific user. ", async function () {
        const [[result]] = await usersDao.getUserByIdService(userId)
        expect(result).to.have.property("firstName").to.be.equal(testUser.firstName)    
        expect(result).to.have.property("lastName").to.be.equal(testUser.lastName)
        expect(result).to.have.property("email").to.be.equal(testUser.email)
        expect(result).to.have.property("birthdate")
        expect(result).to.have.property("password")
        expect(result).to.have.property("lastConnection")
        expect(result).to.have.property("role")
    })

    it("getUserByEmailService(), retrive an object with the specific user. ", async function () {
        const [[result]]: any= await usersDao.getUserByEmailService(testUser.email)
        expect(result).to.be.an("object")
        expect(result).to.have.property("firstName").to.be.equal(testUser.firstName)    
        expect(result).to.have.property("lastName").to.be.equal(testUser.lastName)
        expect(result).to.have.property("email").to.be.equal(testUser.email)
        expect(result).to.have.property("birthdate")
        expect(result).to.have.property("password")
        expect(result).to.have.property("lastConnection")
        expect(result).to.have.property("role")
    })

    it("deleteUserService(pid), delete the specific photo. ", async function () {
        const [result]: any = await usersDao.deleteUserService(userId)
        expect(result).to.be.an("string")
    })


})