import multer from 'multer';
import path from 'path';
<<<<<<< HEAD:src/services/uploader.js
import { v2 as cloudinary } from 'cloudinary';
import config from '../config.js';
import { dataUri } from './utils.js';
=======
import {v2 as cloudinary} from 'cloudinary'

import config from '../config.ts';
import { dataUri } from './utils.ts';


>>>>>>> typescript:src/services/uploader.ts
cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
<<<<<<< HEAD:src/services/uploader.js
    secure: true
});
=======
})


>>>>>>> typescript:src/services/uploader.ts
const localStorage = multer.diskStorage({
    destination: (req, _file, cb) => {
        const subFolder = path.basename(req.path);
        cb(null, `${config.UPLOAD_DOCUMENTS_DIR}/${subFolder}`);
<<<<<<< HEAD:src/services/uploader.js
    },
    filename: (_req, file, cb) => {
        const date = Date.now();
        cb(null, date + file.originalname.split(".")[0].toUpperCase() + "." + file.originalname.split(".")[1]);
    }
});
export const cloudinaryUpload = async (file) => {
    const formatedFile = dataUri(file.originalname, file.buffer).content;
    const result = await cloudinary.uploader.upload(formatedFile);
    return result;
};
export const cloudinaryDestroy = async (fileName) => {
    const result = await cloudinary.uploader.destroy(fileName);
    return result;
};
=======
    },  
    
    filename: (_req, file, cb) => {
        const date = Date.now()
        cb(null, date+file.originalname.split(".")[0].toUpperCase()+"."+file.originalname.split(".")[1] );
    }
});

export const cloudinaryUpload = async (file: {originalname: string, buffer: Buffer}) => {
    const formatedFile: any = dataUri(file.originalname, file.buffer).content;
    const result = await cloudinary.uploader.upload(formatedFile)
    return result
}

export const cloudinaryDestroy = async (fileName: string) => {
    const result = await cloudinary.uploader.destroy(fileName)
    return result
}

>>>>>>> typescript:src/services/uploader.ts
const storage = multer.memoryStorage();
export const uploader = multer({ storage: config.STORAGE === "cloud" ? storage : localStorage });
