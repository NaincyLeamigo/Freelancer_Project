import pino from "pino-http";
import * as Sentry from "@sentry/node";
import { envFlag } from "./config";

export const logger = pino({
    enabled: envFlag("LOG_ENABLED", true),
    customLogLevel: (req, res, err) => {
        if (res.statusCode >= 500) {
            Sentry.captureException(err);
            return "error";
        }
        if (res.statusCode >= 400) return "warn";
        return "info";
    },
});
