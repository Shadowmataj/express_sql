const config = {
    PORT: process.env.PORT || "8000",
    HOST: process.env.HOST || "localhost",
    MYSQL_USER: process.env.MYSQL_USER || "",
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "",
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || "photos_app"
}

export default config