import * as chai from "chai"
import supertest, { Response } from "supertest"


const expect = chai.expect
const requester = supertest("http://localhost:8000")
let photoId = 0
const testPhoto = {file: "test/image/test.png", title: "test", alt: "test"}

describe("Test Photos", function () {
    this.timeout(5000)
    ///** Supertests for register endpoint */
    it("POST api/photos post a specific photo to the DB.", async function () {
        const { statusCode, body}: Response = await requester.post("/api/photos").attach("file", testPhoto.file).field("title", testPhoto.title).field("alt", testPhoto.alt)
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
        const { statusCode, body}: Response = await requester.get("/api/photos")
        expect(body.status).to.be.equal("success")
        expect(body.payload).to.be.an("array")
        expect(statusCode).to.be.equal(200)
    })

    it("GET api/photos/:pid error retrieve a specific photo from the db.", async function () {
        const { statusCode, body}: Response = await requester.get("/api/photos/1")
        expect(body.status).to.be.equal("error")
        expect(statusCode).to.be.equal(400)
    })
    
    
    it("GET api/photos/:pid retrieve a specific photo from the db.", async function () {
        const { statusCode, body}: Response = await requester.get(`/api/photos/${photoId}`)
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
        const { statusCode, body}: Response = await requester.delete(`/api/photos/${photoId}`)
        console.log(body)
        expect(body.status).to.be.equal("success")
        expect(statusCode).to.be.equal(200)
    })

})