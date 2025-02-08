import DatauriParser from 'datauri/parser.js';
import path from "path"


const dUri = new DatauriParser()

export const dataUri = image => {
        return dUri.format(path.extname(image.originalname).toString(), image.buffer);
}