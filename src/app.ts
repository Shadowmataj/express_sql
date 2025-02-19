import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser"

import config from "./config.ts";
import photoRouter from "./routes/photo.routes.ts";
import usersRouter from "./routes/users.routes.ts";
import authRouter from "./routes/auth.routes.ts";
import addLogger from "./services/logger.ts";

const app = express();
const port = 8000;

app.listen(config.PORT, async() => {
  console.log(`App activa en el puerto ${port} (PID: ${process.pid})`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

        // Configure passport middleware, includes sessions.
app.use(passport.initialize())
app.use(passport.initialize())

//Adding logger.
app.use(addLogger)

app.use("/api/photos", photoRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// Access to static content
app.use('/static', express.static(`${config.DIRNAME}/public`));
