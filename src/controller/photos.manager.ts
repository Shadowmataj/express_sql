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

    async getPhoto(pid: number){
        try{
            const result = ps.getPhotoService(pid)
            return result
        }catch(err){
            console.log(`Function getPhoto: ${err}`)
        }
    }

    async createPhoto(title: string, thumbnail: string, alt: string, cloudinaryPublicId: string){
        try{
            const result = ps.createPhotoService(title, thumbnail, alt, cloudinaryPublicId)
            return result
        }catch(err){
            console.log(`Function createPhoto: ${err}`)
        }
    }

    async deletePhotos(pid: number){
        try{
            const result = ps.deletePhotosService(pid)
            return result
        }catch(err){
            console.log(`Function deletePhotos: ${err}`)
        }
    }

}

export default PhotosManager