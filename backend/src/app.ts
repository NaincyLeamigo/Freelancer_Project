import "reflect-metadata";
import * as express from "express";
import * as compression from "compression";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import Redis from "ioredis";
import pino from "pino-http";
import { initDataSources } from "./config/data-source";
import { expressPort, redisConfig, SENTRY_DSN } from "./config/config";
import { initSentry } from "./config/sentry";
import authRoutes from "./routes/auth.routes";

export const app = express();

// ----- SENTRY -----
if (process.env.SENTRY_DSN) {
  initSentry(app);
}

// ----- MIDDLEWARE -----
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

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
app.use("/api/auth", authRoutes);
// app.get("/", (req, res) => {
//     res.send("Backend Running Successfully 🚀");
// });

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
