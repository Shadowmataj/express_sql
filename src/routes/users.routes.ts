import { Request, Response, Router } from "express";
import moment from "moment";

import UsersManager from "../controller/users.manager.ts";
import { User } from "../types.ts";

const usersRouter = Router();
const um = new UsersManager();
// interface CustomRequest<T> extends Request {
//   body: T
// }
//Endpoint to get a user by the email.
usersRouter.get("/email", async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const result: User|undefined = await um.getUserByEmail(email);
    if (!result) throw new Error("The user's email is not correct.");

    req.logger.info(`${moment().format()} ${req.method} api/users${req.url}`)
    res.status(200).send({ status: "success", payload: result });
  } catch (err: any) {
    console.log(err.message)
    res.status(400).send({ status: "error", payload: err.message });
  }
});


//Endpoint to retrieve all the users.
usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await um.getUsers();

    res.status(200).send({ status: "success", payload: result });
  } catch (err: any) {
    req.logger.error(`${moment().format()} ${req.method} api/users${req.url} ${err}`)
    res.status(400).send({ status: "error", payload: err.message });
  }
});

//Endpoint to retrieve a single user.
usersRouter.get("/:uid", async (req: Request, res: Response) => {
  const uid: number = +req.params.uid;
  try {
    const result: Partial<User>|undefined = await um.getUserById(uid);
    if (!result) throw new Error("The user's id is not correct.");

    res.status(200).send({ status: "success", payload: result });
  } catch (err: any) {
    req.logger.error(`${moment().format()} ${req.method} api/users${req.url} ${err}`)
    res.status(400).send({ status: "error", payload: err.message });
  }
});


//Endpoint to delete a single user.
usersRouter.delete("/:uid", async (req: Request, res: Response) => {
  const uid: number = +req.params.uid;
  try {
    const result: any = await um.deleteUsers(uid);
    if (result === undefined) throw new Error("The oparation can not be done, the id is incorrect.");

    res.status(200).send({
        status: "success",
        payload: `The user "${result}" has been deleted.`,
      });
  } catch (err: any) {
    req.logger.error(`${moment().format()} ${req.method} api/users${req.url} ${err}`)
    res.status(400).send({ status: "error", payload: err.message });
  }
});

export default usersRouter;
