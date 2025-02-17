import DatauriParser from 'datauri/parser.js';
import path from "path"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import config from '../config.js';
import { NextFunction, Request, Response } from 'express';

interface User  {firstName: string, email: string}

const dUri = new DatauriParser();

export const dataUri = (originalname: string, buffer: Buffer) => {
        const duri = dUri.format(path.extname(originalname).toString(), buffer);
        return duri;
}

export const createHash = (password: string): string => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user:  {password: string }, password: string): boolean => bcrypt.compareSync(password, user.password)

export const createToken = (payload: User, duration: any) => jwt.sign(payload, config.SECRET, { expiresIn: duration })

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
        // Header Authorization: Bearer <token>
        const headerToken: string | undefined = req.headers.authorization ? req.headers.authorization : undefined;
        const cookieToken: string | undefined = req.headers.cookie ? req.headers.cookie.split("=")[1].split("; ")[0] : undefined;
        const queryToken: any = req.query.access_token ? req.query.access_token : undefined;
        const receivedToken: string | undefined = headerToken || cookieToken || queryToken;

        if (!receivedToken) return res.status(401).send({ Error: "ERROR", type: 'Token needed' });

        jwt.verify(receivedToken, config.SECRET, (err, payload) => {
                if (err) return res.status(403).send({ Error: "ERROR", type: 'Token no válido' });
                req.jwtuser = payload;
                next();
        });
}