import express from "express";
import config from "./config.js";
import photoRouter from "./routes/photo.routes.js";
import usersRouter from "./routes/users.routes.js";
import authRouter from "./routes/auth.routes.js";
import addLogger from "./services/logger.js";
const app = express();
const port = 8000;
app.listen(config.PORT, async () => {
    console.log(`App activa en el puerto ${port} (PID: ${process.pid})`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Adding logger.
app.use(addLogger);
app.use("/api/photos", photoRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
// Access to static content
app.use('/static', express.static(`${config.DIRNAME}/public`));
