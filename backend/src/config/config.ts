import * as dotenv from "dotenv";
dotenv.config();

export function envFlag(key: string, fallback = false): boolean {
    const val = process.env[key];
    return val ? val === "true" || val === "1" : fallback;
}

export function envVal<T>(key: string, fallback?: T): T | string | undefined {
    return process.env[key] ?? fallback;
}

export function envInt<T>(key: string, fallback?: T): number | T {
    return process.env[key] ? parseInt(process.env[key]!, 10) : fallback!;
}

export const expressPort = {
    port: envInt("PORT", 9091),
};

// ------------------- POSTGRES -----------------------
export const DATABASE_TYPE: any = "postgres";

export const PostgresDataSource = {
    type: DATABASE_TYPE,
    host: envVal("DB_HOST", "localhost"),
    port: envInt("DB_PORT", 5432),
    username: envVal("DB_USER", "postgres"),
    password: envVal("DB_PASSWORD", ""),
    database: envVal("DB_NAME", "skyoffice"),
};

// export const sslEnabled = {
//     isEnabled: envFlag("SSL_ENABLED", false),
// };


// ------------------- MONGO -----------------------
export const DatabaseSource = (() => {
    const mongoUser = envVal("MONGO_USER");
    const mongoPassword = envVal("MONGO_PASSWORD");
    const mongoHost = envVal("MONGO_HOST");
     const dbName = envVal('MONGO_DB_NAME', 'skyoffice');

    const uri = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}/${dbName}?authSource=admin`;

    return {
        hostUrl: uri,
    };
})();


// ------------------- REDIS -----------------------
export const redisConfig = {
    host: envVal("REDIS_HOST", "localhost"),
    port: envInt("REDIS_PORT", 6379),
    user: envVal("REDIS_USERNAME", ""),
    password: envVal("REDIS_PASSWORD", ""),
};


// ------------------- JWT -----------------------
export const jwtSignIN = { 
    refreshTokenExpiredTime: envVal('REFRESH_TOKEN_EXPIRED_TIME', '10d'),
    tokenExpiredTime: envVal('TOKEN_EXPIRED_TIME', '2d'),
    secret: envVal('JWT_SECRET', 'd3sR5!k8L3tr'),
};

export const jwtPayload = {
    userId: envVal("JWT_PAYLOAD_USER_ID", "sub"),
    roles: envVal("JWT_PAYLOAD_USER_ROLE", "roles"),
};

// ------------------- AWS -----------------------
// export const AWS_Config = {
//     bucketName: envVal("S3_FILE_BUCKET"),
//     accessKey: envVal("AWS_KEY"),
//     secretKey: envVal("AWS_SECRET"),
//     region: envVal("AWS_REGION", "us-east-2"),
// };


// ------------------- SENTRY -----------------------
export const SENTRY_DSN = envVal("SENTRY_DSN");
