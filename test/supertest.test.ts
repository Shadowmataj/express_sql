import * as chai from "chai"
import supertest from "supertest"


const expect = chai.expect
const requester = supertest("http://localhost:8000")
let photoId = 0
const testPhoto = {file: "test/image/test.png", title: "test", alt: "test"}

describe("Test Photos", function () {
    this.timeout(8000)
    ///** Supertests for register endpoint */
    it("POST api/photos post a specific photo to the DB.", async function () {
        const { statusCode, body} = await requester.post("/api/photos").attach("file", testPhoto.file).field("title", testPhoto.title).field("alt", testPhoto.alt)
        expect(body.status).to.be.equal("success")
        expect(body.payload).to.have.property("photoId")
        expect(body.payload).to.have.property("title") 
        expect(body.payload).to.have.property("photoText") 
        expect(body.payload).to.have.property("thumbnail") 
        expect(body.payload).to.have.property("alt") 
        expect(body.payload).to.have.property("userId") 
        expect(body.payload).to.have.property("cloudinaryPublicId") 
        photoId = +(body.payload.photoId)
        expect(photoId).to.be.a("number")
        expect(statusCode).to.be.equal(200)
    })

    it("GET api/photos retrieve all the photos from the db.", async function () {
        const { statusCode, body}= await requester.get("/api/photos")
        expect(body.status).to.be.equal("success")
        expect(body.payload).to.be.an("array")
        expect(statusCode).to.be.equal(200)
    })

    it("GET api/photos/:pid error retrieve a specific photo from the db.", async function () {
        const { statusCode, body} = await requester.get("/api/photos/1")
        expect(body.status).to.be.equal("error")
        expect(statusCode).to.be.equal(400)
    })
    
    
    it("GET api/photos/:pid retrieve a specific photo from the db.", async function () {
        const { statusCode, body} = await requester.get(`/api/photos/${photoId}`)
        expect(body.status).to.be.equal("success")
        expect(body.payload).to.have.property("photoId")
        expect(body.payload).to.have.property("title").and.to.be.equal(testPhoto.title)
        expect(body.payload).to.have.property("photoText") 
        expect(body.payload).to.have.property("thumbnail") 
        expect(body.payload).to.have.property("alt").and.to.be.equal(testPhoto.alt)
        expect(body.payload).to.have.property("userId") 
        expect(body.payload).to.have.property("cloudinaryPublicId") 
        expect(statusCode).to.be.equal(200)
    })
    

    it("DELETE api/photos delete a specific photo to the DB.", async function () {
        const { statusCode, body} = await requester.delete(`/api/photos/${photoId}`)
        expect(body.status).to.be.equal("success")
        expect(body.payload).to.be.a("string")

        expect(statusCode).to.be.equal(200)
    })

})



const testUser = {firstName: "test", lastName: "test", email: "test@gmail.com", birthday: "1999-02-24", password: "test1234"}
let userId: number = 0
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
describe("Test Users", function () {
    
    ///** Supertests for register endpoint */

    it("POST api/auth/register post a specific user to the DB.", async function () {
        const { statusCode, body} = await requester.post("/api/auth/register").send(testUser)
        expect(body.status).to.be.equal("success")
        expect(body.payload).to.have.property("userId")
        expect(body.payload).to.have.property("firstName").and.to.be.equal(testUser.firstName)
        expect(body.payload).to.have.property("lastName").and.to.be.equal(testUser.lastName)
        expect(body.payload).to.have.property("email").and.to.be.equal(testUser.email)
        expect(body.payload).to.have.property("birthdate")
        expect(body.payload).not.to.have.property("password")
        expect(body.payload).to.have.property("lastConnection")
        expect(body.payload).to.have.property("role")
        userId = +(body.payload.userId)
        expect(userId).to.be.a("number")
        expect(statusCode).to.be.equal(200)
    })

    it("POST api/auth/register error posting a user to the db.", async function () {
        const { statusCode, body} = await requester.post("/api/auth/register").send(testUser)
        expect(body.status).to.be.equal("error")
        expect(body.payload).to.be.a("string")
        expect(statusCode).to.be.equal(400)
    })

    it("POST api/auth/jwtlogin authenticate an specific user.", async function () {
        const { statusCode, body} = await requester.
        post("/api/auth/jwtlogin").
        send({email: testUser.email, userPassword: testUser.password})
        expect(body.status).to.be.equal("success")
        expect(body.payload).to.have.property("userId")
        expect(body.payload).to.have.property("firstName").and.to.be.equal(testUser.firstName)
        expect(body.payload).to.have.property("lastName").and.to.be.equal(testUser.lastName)
        expect(body.payload).to.have.property("email").and.to.be.equal(testUser.email)
        expect(body.payload).to.have.property("birthdate")
        expect(body.payload).not.to.have.property("password")
        expect(body.payload).to.have.property("lastConnection")
        expect(body.payload).to.have.property("role")
        expect(statusCode).to.be.equal(200)
    })

    

    it("GET api/users retrieve all the users from the db.", async function () {
        const { statusCode, body}= await requester.get("/api/users")
        expect(body.status).to.be.equal("success")
        expect(body.payload).to.be.an("array")
        expect(statusCode).to.be.equal(200)
    })

    it("GET api/users/:pid retrieve a specific user from the db.", async function () {
        const { statusCode, body} = await requester.get(`/api/users/${userId}`)
        expect(body.payload).to.have.property("userId")
        expect(body.payload).to.have.property("firstName")
        expect(body.payload).to.have.property("lastName")
        expect(body.payload).to.have.property("email")
        expect(body.payload).to.have.property("birthdate")
        expect(body.payload).to.have.property("lastConnection")
        expect(body.payload).to.have.property("role")
        expect(body.payload).not.to.have.property("password")
        expect(statusCode).to.be.equal(200)
        expect(body.status).to.be.equal("success")
    })

    it("GET api/users/:email retrieve a specific user from the db by email.", async function () {
        const { statusCode, body} = await requester.get(`/api/users/email`).send({"email": testUser.email})
        expect(body.payload).to.have.property("userId")
        expect(body.payload).to.have.property("firstName")
        expect(body.payload).to.have.property("lastName")
        expect(body.payload).to.have.property("email")
        expect(body.payload).to.have.property("birthdate")
        expect(body.payload).to.have.property("lastConnection")
        expect(body.payload).to.have.property("role")
        expect(body.payload).to.have.property("password")
        expect(statusCode).to.be.equal(200)
        expect(body.status).to.be.equal("success")
    })    

    it("DELETE api/users delete a specific user to the DB.", async function () {
        const { statusCode, body} = await requester.delete(`/api/users/${userId}`)
        expect(body.status).to.be.equal("success")
        expect(statusCode).to.be.equal(200)
    })

})