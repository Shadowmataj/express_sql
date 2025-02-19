import { Request, Response, Router } from "express";

import moment from "moment";
import initAuthStrategies from "../auth/passport.strategies.ts";
import UsersManager from "../controller/users.manager.ts";
import { createHash, createToken, isValidPassword } from "../services/utils.ts";
import { User } from "../types.ts";
const authRouter = Router();
const um = new UsersManager();
initAuthStrategies();

//Enpoint to create a user.
authRouter.post("/register", async (req: Request, res: Response) => {
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

authRouter.post("/jwtlogin", async (req: Request, res: Response) => {
    const {email, userPassword} = req.body;
    try {
        const user: User | undefined = await um.getUserByEmail(email)
        if(!user) throw new Error("The email is not correct.")
        if(!isValidPassword(user, userPassword)) throw new Error("The password is not correct.")
        
        const {password, ...filteredUser } = user
        const token = createToken(filteredUser, "60s");
        req.logger.info(`${moment().format()} ${req.method} auth${req.url}`)
        res.status(200).cookie("photoAppToken", token, {
            httpOnly: true,
            secure: process.env.MODE === "prod",
            sameSite: "strict",
            maxAge: 1000*60} )
            .send({ status: "success", payload: filteredUser})
    }
    catch (err: any) {
        req.logger.error(`${moment().format()} ${req.method} auth${req.url} ${err}`)
        res.status(500).send({ status: "error", type: err.message })
    }
})

export default authRouter