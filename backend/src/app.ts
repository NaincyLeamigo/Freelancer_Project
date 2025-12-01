import "reflect-metadata";
import express from "express";
import compression from "compression";
import cors from "cors";
import Redis from "ioredis";
import pino from "pino-http";
import { initDataSources } from "./config/data-source";
import { expressPort, redisConfig, SENTRY_DSN } from "./config/config";
import { initSentry } from "./config/sentry";

export const app = express();

// ----- SENTRY -----
if (process.env.SENTRY_DSN) {
  initSentry(app);
}

// ----- MIDDLEWARE -----
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "*",
    credentials: true,
}));

// ----- LOGGER -----
app.use(pino());

// ----- REDIS -----
const redisPrefix = process.env.REDIS_PREFIX || "skyofficeproject:";
export const redisClient = new Redis({
    host: redisConfig.host,
    port: redisConfig.port,
    username: redisConfig.user,
    password: redisConfig.password,
    keyPrefix: redisPrefix,
});

redisClient.on("connect", () => console.log("Redis Connected"));
redisClient.on('error', (err: Error) => {
  console.log('Redis connection error:', err);
});

app.set("redisClient", redisClient);

// ----- ROUTES -----
app.get("/", (req, res) => {
    res.send("Backend Running Successfully 🚀");
});

// ----- 404 -----
app.use((req, res) => {
    res.status(404).json({ message: `Path '${req.path}' not found` });
});


// ----- START SERVER -----
initDataSources().then(() => {
    app.listen(expressPort.port, () => {
        console.log(`Server running on port ${expressPort.port}`);
    });
});
