import * as winston  from 'winston';

import config from '../config.ts';
import { Request, Response, NextFunction } from 'express';

const customLevels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http:4,
    debug: 5
}

const devLogger = winston.createLogger({
    levels: customLevels,
    transports: [
        new winston.transports.Console({ level: 'debug' })
    ]
});

const prodLogger = winston.createLogger({
    levels: customLevels,
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ level: 'error', filename: `${config.DIRNAME}/winston/errors.log` })
    ]
});

const addLogger = (req: Request, _res: Response, next: NextFunction) => {
    req.logger = config.MODE === 'dev' ? devLogger : prodLogger;
    req.logger.info(`${new Date().toDateString()} ${req.method} ${req.url}`);
    next();
}

export default addLogger;
