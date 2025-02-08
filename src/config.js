import * as url from "url"
import path from "path"

const config = {
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),
    get UPLOAD_DOCUMENTS_DIR() { return `${this.DIRNAME}/uploads` },
    PORT: process.env.PORT || "8000",
    HOST: process.env.HOST || "localhost",
    MYSQL_USER: process.env.MYSQL_USER || "",
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "",
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || "photos_app",
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME, 
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    STORAGE: process.env.STORAGE || "disk",

}

export default config