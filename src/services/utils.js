import DatauriParser from 'datauri/parser.js';
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from '../config.js';
const dUri = new DatauriParser();
export const dataUri = (originalname, buffer) => {
    const duri = dUri.format(path.extname(originalname).toString(), buffer);
    return duri;
};
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
export const createToken = (payload, duration) => jwt.sign(payload, config.SECRET, { expiresIn: duration });
export const verifyToken = (req, res, next) => {
    // Header Authorization: Bearer <token>
    const headerToken = req.headers.authorization ? req.headers.authorization : undefined;
    const cookieToken = req.headers.cookie ? req.headers.cookie.split("=")[1].split("; ")[0] : undefined;
    const queryToken = req.query.access_token ? req.query.access_token : undefined;
    const receivedToken = headerToken || cookieToken || queryToken;
    if (!receivedToken)
        return res.status(401).send({ Error: "ERROR", type: 'Token needed' });
    jwt.verify(receivedToken, config.SECRET, (err, payload) => {
        if (err)
            return res.status(403).send({ Error: "ERROR", type: 'Token no válido' });
        req.jwtuser = payload;
        next();
    });
};
