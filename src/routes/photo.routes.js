import { Router } from "express";
import moment from "moment";

import config from "../config.js";
import PhotosManager from "../controller/photos.manager.js";
import { cloudinaryDestroy, cloudinaryUpload, uploader } from "../services/uploader.js";

const photoRouter = Router();
const pm = new PhotosManager();

//Endpoint to retrieve all the photos.
photoRouter.get("/", async (req, res) => {
  try {
    const result = await pm.getPhotos();

    req.logger.info(`${moment().format()} ${req.method} api/photos${req.url}`)
    res.status(200).send({ status: "success", payload: result });
  } catch (err) {
    req.logger.error(`${moment().format()} ${req.method} api/photos${req.url} ${err}`)
    res.status(400).send({ status: "error", payload: err.message });
  }
});

//Endpoint to retrieve a single photo.
photoRouter.get("/:pid", async (req, res) => {
  const pid = +req.params.pid;
  try {
    const [[result]] = await pm.getPhoto(pid);
    if (result.length === 0) throw new Error("The photo's id is not correct.");

    req.logger.info(`${moment().format()} ${req.method} api/photos${req.url}`)
    res.status(200).send({ status: "success", payload: result });
  } catch (err) {
    req.logger.error(`${moment().format()} ${req.method} api/photos${req.url} ${err}`)
    res.status(400).send({ status: "error", payload: err.message });
  }
});

//Endpoint to upload a photo.
photoRouter.post("/", uploader.single("file"), async (req, res) => {
  const { title, alt } = req.body;
  let response = undefined
  let uploadedInfo = undefined 
  let cloudinaryPublicId = undefined
  try {

    if (!req.file) throw new Error("No photo was upload.");
    if(config.STORAGE === "cloud"){  
      uploadedInfo = await cloudinaryUpload(req.file);
      cloudinaryPublicId = uploadedInfo.public_id;
      response = uploadedInfo.secure_url;
    }
    const thumbnail = !response ? req.file.path : response;
    const [[result]] = await pm.createPhoto(title, thumbnail, alt, cloudinaryPublicId);

    req.logger.info(`${moment().format()} ${req.method} api/photos${req.url}`)
    res.status(200).send({ status: "success", payload: result });
  } catch (err) {
    req.logger.error(`${moment().format()} ${req.method} api/photos${req.url} ${err}`)
    res.status(400).send({ status: "error", payload: err.message });
  }
});

//Endpoint to edit a photo.
photoRouter.put("/", async (req, res) => {
  req.logger.info(`${moment().format()} ${req.method} api/photos${req.url}`)
  res.status(200).send({ status: "success", payload: "photos" });
});

//Endpoint to delete a single photo.
photoRouter.delete("/:pid", async (req, res) => {
  const pid = +req.params.pid;
  try {
    const result = await pm.deletePhotos(pid);
    console.log(result)
    await cloudinaryDestroy(result, result => console.log(result));


    if (result === undefined) throw new Error("The oparation can not be done, the id is incorrect.");

    req.logger.info(`${moment().format()} ${req.method} api/photos${req.url}`)
    res.status(200).send({
        status: "success",
        payload: `The photo "${result.italics()}" has been deleted.`,
      });
  } catch (err) {
    req.logger.error(`${moment().format()} ${req.method} api/photos${req.url} ${err}`)
    res.status(400).send({ status: "error", payload: err.message });
  }
});

export default photoRouter;
