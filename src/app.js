import express from "express";

import config from "./config.js";
import photoRouter from "./routes/photo.routes.js";

const app = express();
const port = 8000;

app.listen(config.PORT, (async) => {
  console.log(`App activa en el puerto ${port} (PID: ${process.pid})`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/photos", photoRouter);

// Access to static content
app.use('/static', express.static(`${config.DIRNAME}/public`));
