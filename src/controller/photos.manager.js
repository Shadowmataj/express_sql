import PhotosServices  from "../services/photos.dao.sqldb.js"

const ps = new PhotosServices()

class PhotosManager{

    async getPhotos(){
        try{
            const result = ps.getPhotosService()
            return result
        }catch(err){
            console.log(`Function getPhotos: ${err}`)
        }
    }

    async getPhoto(pid){
        try{
            const result = ps.getPhotoService(pid)
            return result
        }catch(err){
            console.log(`Function getPhotos: ${err}`)
        }
    }

    async createPhoto(title, thumbnail, alt, cloudinaryPublicId){
        try{
            const result = ps.createPhotoService(title, thumbnail, alt, cloudinaryPublicId)
            return result
        }catch(err){
            console.log(`Function getPhotos: ${err}`)
        }
    }

    async deletePhotos(pid){
        try{
            const result = ps.deletePhotosService(pid)
            return result
        }catch(err){
            console.log(`Function getPhotos: ${err}`)
        }
    }

}

export default PhotosManager