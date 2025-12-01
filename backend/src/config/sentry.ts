import * as Sentry from "@sentry/node";
import type { Express, Request, Response, NextFunction } from "express";

// Initialize Sentry
export function initSentry(app: Express) {
    const dsn: string | undefined = process.env.SENTRY_DSN;

    if (!dsn) {
        console.warn("SENTRY_DSN is not defined, skipping Sentry initialization");
        return;
    }

    Sentry.init({
        dsn,
        tracesSampleRate: 1.0,
        environment: process.env.ENV || "development",
        serverName: "dashboard",
    });

    // Middleware to handle requests
    app.use((req: Request, res: Response, next: NextFunction) => {
        Sentry.setContext("request", {
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
        });
        next();
    });

    // Error handler middleware
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        Sentry.captureException(err);
        console.error(err);

        res.status(err.status || 500).json({
            message: err.message || "Internal Server Error",
        });
    });

    console.log("Sentry initialized ✅");

    return Sentry;
}

export default Sentry;
