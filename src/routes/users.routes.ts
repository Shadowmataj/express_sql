import { Router } from "express";
import moment from "moment";

import usersManager from "../controller/users.manager.js";

const usersRouter = Router();
const um = new usersManager();

//Endpoint to retrieve all the users.
usersRouter.get("/", async (req, res) => {
  try {
    const result = await um.getUsers();

    req.logger.info(`${moment().format()} ${req.method} api/users${req.url}`)
    res.status(200).send({ status: "success", payload: result });
  } catch (err: any) {
    req.logger.error(`${moment().format()} ${req.method} api/users${req.url} ${err}`)
    res.status(400).send({ status: "error", payload: err.message });
  }
});

//Endpoint to retrieve a single user.
usersRouter.get("/:uid", async (req, res) => {
  const uid: number = +req.params.uid;
  try {
    const [[result]] = await um.getUserById(uid);
    if (result.length === 0) throw new Error("The photo's id is not correct.");

    req.logger.info(`${moment().format()} ${req.method} api/users${req.url}`)
    res.status(200).send({ status: "success", payload: result });
  } catch (err: any) {
    req.logger.error(`${moment().format()} ${req.method} api/users${req.url} ${err}`)
    res.status(400).send({ status: "error", payload: err.message });
  }
});

//Endpoint to edit a user.
usersRouter.put("/", async (req, res) => {
  req.logger.info(`${moment().format()} ${req.method} api/users${req.url}`)
  res.status(200).send({ status: "success", payload: "Users" });
});

//Endpoint to delete a single photo.
usersRouter.delete("/:uid", async (req, res) => {
  const uid: number = +req.params.uid;
  try {
    const result = await um.deleteUsers(uid);

    if (result === undefined) throw new Error("The oparation can not be done, the id is incorrect.");

    req.logger.info(`${moment().format()} ${req.method} api/users${req.url}`)
    res.status(200).send({
        status: "success",
        payload: `The photo "${result.italics()}" has been deleted.`,
      });
  } catch (err: any) {
    req.logger.error(`${moment().format()} ${req.method} api/users${req.url} ${err}`)
    res.status(400).send({ status: "error", payload: err.message });
  }
});

export default usersRouter;
