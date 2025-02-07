CREATE DATABASE photos_app;

USE photos_app;

CREATE TABLE
    photos (
        id integer PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        thumbnails TEXT NOT NULL,
        alt VARCHAR(255) NOT NULL,
        created TIMESTAMP NOT NULL DEFAULT NOW()
    );

INSERT INTO
    photos (title, thumbnails, alt)
VALUES
    (
        "Butterfly in the mud",
        "https://instagram.fmex36-1.fna.fbcdn.net/v/t51.2885-15/469908266_18480285436052830_8932526754119252098_n.webp?efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDgxMC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fmex36-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2AHZb8ezrNetFX5zSeChccza3lj3GNU_JE_Y34nPn59Z9q_RgxsOk8W3Xd3Rc8CQx8U1WI-LqiuFZE7GNx-FDG8z&_nc_ohc=OsvoHK-ZhlAQ7kNvgFCnx3P&_nc_gid=5117128cf60c4b6680cfaf1e2ac75555&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzUyMDM1ODgwMjQxMjg4OTM2Mw%3D%3D.3-ccb7-5&oh=00_AYCO-kTua6l-cwNI-iOfPb2e88TB8PD3s6muijR5-t4cPg&oe=67AB2E48&_nc_sid=7a9f4b",
        "A butterfly photo."
    );