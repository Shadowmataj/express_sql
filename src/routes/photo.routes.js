import { Router } from "express";

import PhotosManager from "../controller/photos.manager.js";
import { cloudinaryUpload, uploader } from "../services/uploader.js";
import config from "../config.js";

const photoRouter = Router();
const pm = new PhotosManager();

//Endpoint to retrieve all the photos.
photoRouter.get("/", async (req, res) => {
  try {
    const result = await pm.getPhotos();
    res.status(200).send({ status: "success", payload: result });
  } catch (err) {
    res.status(400).send({ status: "error", payload: err.message });
  }
});

//Endpoint to retrieve a single photo.
photoRouter.get("/:pid", async (req, res) => {
  const pid = +req.params.pid;
  try {
    const [result] = await pm.getPhoto(pid);
    if (result === undefined) throw new Error("The photo's id is not correct.");
    res.status(200).send({ status: "success", payload: result });
  } catch (err) {
    res.status(400).send({ status: "error", payload: err.message });
  }
});

//Endpoint to upload a photo.
photoRouter.post("/", uploader.single("file"), async (req, res) => {
  const { title, alt } = req.body;
  let response = undefined
  try {
    if (!req.file) throw new Error("No photo was upload.");
    if(config.STORAGE === "cloud")  response = (await cloudinaryUpload(req.file)).secure_url;

    const thumbnails = !response ? req.file.path : response;

    const [result] = await pm.createPhoto(title, thumbnails, alt);
    res.status(200).send({ status: "success", payload: result });
  } catch (err) {
    res.status(400).send({ status: "error", payload: err.message });
  }
});

//Endpoint to edit a photo.
photoRouter.put("/", async (req, res) => {
  res.status(200).send({ status: "success", payload: "photos" });
});

//Endpoint to delete a single photo.
photoRouter.delete("/:pid", async (req, res) => {
  const pid = +req.params.pid;
  try {
    const [result] = await pm.deletePhotos(pid);
    if (result === undefined)
      throw new Error("The oparation can not be done, the id is incorrect.");
    res
      .status(200)
      .send({
        status: "success",
        payload: `The photo "${result.title.italics()}" has been deleted.`,
      });
  } catch (err) {
    res.status(400).send({ status: "error", payload: err.message });
  }
});

export default photoRouter;
