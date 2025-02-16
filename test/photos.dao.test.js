import * as chai from "chai";
import PhotosServices from "../src/services/photos.dao.sqldb.js";

const dao = new PhotosServices()
const expect = chai.expect
let photoId = 0
let testPhoto = {title: "test", thumbnail: "http://cloudinary.com", alt: "test", cloudinaryPublicId: "fakeId"}


describe("Test DAO photos", function () {
    
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
    
    it("createPhotoService(pid), retrive an object with the specific photo. ", async function () {
        const [[result]] = await dao.createPhotoService(testPhoto.title, testPhoto.thumbnail, testPhoto.alt, testPhoto.cloudinaryPublicId)
        expect(result).to.be.an("object")
        photoId = +result.photoId
        expect(result).to.have.property("photoId")
        expect(result).to.have.property("title")
        expect(result).to.have.property("photoText")
        expect(result).to.have.property("thumbnail")
        expect(result).to.have.property("alt")
        expect(result).to.have.property("userId")
        expect(result).to.have.property("cloudinaryPublicId")
    })
    
    it("getPhotosService(), retrive an array with photos. ", async function () {
        const result = await dao.getPhotosService()
        photoId = result[0].photoId
        expect(result).to.be.an("array")
    })

    it("getPhotoService(), retrive an object with the specific photo. ", async function () {
        const [[result]] = await dao.getPhotoService(photoId)
        expect(result).to.be.an("object")
        expect(result).to.have.property("photoId")
        expect(result).to.have.property("title")
        expect(result).to.have.property("photoText")
        expect(result).to.have.property("thumbnail")
        expect(result).to.have.property("alt")
        expect(result).to.have.property("userId")
        expect(result).to.have.property("cloudinaryPublicId")
    })

    it("deletePhotoService(pid), delete the specific photo. ", async function () {
        const [result] = await dao.deletePhotosService(photoId)
        expect(result).to.be.an("string")
    })


})