import { Router } from "express";
import passport from "passport";

import usersManager from "../controller/users.manager.ts";
import { createHash, createToken } from "../services/utils.ts";
import initAuthStrategies from "../auth/passport.strategies.ts";
import moment from "moment";

const authRouter = Router();
const um = new usersManager();
initAuthStrategies();

//Enpoint to create a user.
authRouter.post("/", async (req, res) => {
    const { firstName, lastName, email, birthday, password } = req.body;
    try {
        const hashedPassword: string = createHash(password);
        const result = await um.createUser(firstName, lastName, email, birthday, hashedPassword);
        req.logger.info(`${moment().format()} ${req.method} api/auth${req.url}`)
        res.status(200).send({ status: "success", payload: result });
    } catch (err: any) {
        req.logger.info(`${moment().format()} ${req.method} api/auth${req.url} ${err}`)
        res.status(400).send({ status: "error", payload: err.message });
    }
});

authRouter.post("/jwtlogin", passport.authenticate("login", { failureMessage: "x" }), async (req, res) => {

    try {
        const token = createToken(req.jwtuser, "24h")
        req.logger.info(`${moment().format()} ${req.method} auth${req.url}`)
        res.status(200).send({ status: "OK", payload: req.user, token: token, cookieName: "boostCookie", maxAge: 86400 })
    }
    catch (err) {
        req.logger.error(`${moment().format()} ${req.method} auth${req.url} ${err}`)
        res.status(500).send({ status: "ERROR", type: err })
    }
})

export default authRouter