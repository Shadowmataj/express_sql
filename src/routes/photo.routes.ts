import { Request, Response, Router } from "express";
import moment from "moment";

import multer from "multer";
import config from "../config.ts";
import PhotosManager from "../controller/photos.manager.ts";
import { cloudinaryDestroy, cloudinaryUpload } from "../services/uploader.ts";
import { Photo } from "../types.ts";

const photoRouter = Router();
const pm = new PhotosManager();
const uploader = multer();

//Endpoint to retrieve all the photos.
photoRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pm.getPhotos();

    req.logger.info(`${moment().format()} ${req.method} api/photos${req.url}`);
    res.status(200).send({ status: "success", payload: result });
  } catch (err: any) {
    req.logger.error(
      `${moment().format()} ${req.method} api/photos${req.url} ${err}`
    );
    res.status(400).send({ status: "error", payload: err.message });
  }
});

//Endpoint to retrieve a single photo.
photoRouter.get("/:pid", async (req: Request, res: Response) => {
  const pid = +req.params.pid;
  try {
    const result: Photo | undefined = await pm.getPhoto(pid);
    if (result === undefined) throw new Error("The photo's id is not correct.");

    req.logger.info(`${moment().format()} ${req.method} api/photos${req.url}`);
    res.status(200).send({ status: "success", payload: result });
  } catch (err: any) {
    req.logger.error(
      `${moment().format()} ${req.method} api/photos${req.url} ${err}`
    );
    res.status(400).send({ status: "error", payload: err.message });
  }
});

//Endpoint to upload a photo.
photoRouter.post(
  "/",
  uploader.single("file"),
  async (req: Request, res: Response) => {
    const { title, alt } = req.body;
    let response: any = undefined;
    let uploadedInfo: any = undefined
    let cloudinaryPublicId: any = undefined
    try {

        if (!req.file) throw new Error("No photo was upload.");
        if (config.STORAGE === "cloud") {
            uploadedInfo = await cloudinaryUpload(req.file);
            cloudinaryPublicId = uploadedInfo.public_id;
            response = uploadedInfo.secure_url;
        }
        const thumbnail = !response ? req.file.path : response;
        const result = await pm.createPhoto(title, thumbnail, alt, cloudinaryPublicId);

        req.logger.info(`${moment().format()} ${req.method} api/photos${req.url}`)
        res.status(200).send({ status: "success", payload: result });
    } catch (err: any) {
        req.logger.error(`${moment().format()} ${req.method} api/photos${req.url} ${err}`)
        res.status(400).send({ status: "error", payload: err.message });
    }
  }
);

//Endpoint to edit a photo.
photoRouter.put("/", async (req: Request, res: Response) => {
  req.logger.info(`${moment().format()} ${req.method} api/photos${req.url}`);
  res.status(200).send({ status: "success", payload: "photos" });
});

//Endpoint to delete a single photo.
photoRouter.delete("/:uid", async (req: Request, res: Response) => {
  const uid = +req.params.uid;
    try {
        const result: string | undefined = await pm.deletePhotos(uid);
        
        if (result === undefined)
            throw new Error("The oparation can not be done, the id is incorrect.");
        await cloudinaryDestroy(result);
        req.logger.info(`${moment().format()} ${req.method} api/photos${req.url}`);
        res.status(200).send({
            status: "success",
            payload: `The photo "${result}" has been deleted.`,
        });
    }
    catch (err:any) {
        req.logger.error(`${moment().format()} ${req.method} api/photos${req.url} ${err}`);
        res.status(400).send({ status: "error", payload: err.message });
    }
});

export default photoRouter;
