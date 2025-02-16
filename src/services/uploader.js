import multer from 'multer';
import path from 'path';
import {v2 as cloudinary} from 'cloudinary'

import config from '../config.js';
import { dataUri } from './utils.js';


cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
})


const localStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const subFolder = path.basename(req.path);
        cb(null, `${config.UPLOAD_DOCUMENTS_DIR}/${subFolder}`);
    },  
    
    filename: (req, file, cb) => {
        const date = Date.now()
        cb(null, date+file.originalname.split(".")[0].toUpperCase()+"."+file.originalname.split(".")[1] );
    }
});

export const cloudinaryUpload = async file => {
    const formatedFile = dataUri(file).content;
    const result = await cloudinary.uploader.upload(formatedFile)
    return result
}

export const cloudinaryDestroy = async fileName => {
    const result = await cloudinary.uploader.destroy(fileName)
    return result
}

const storage = multer.memoryStorage();
export const uploader = multer({ storage: config.STORAGE === "cloud" ? storage : localStorage });
