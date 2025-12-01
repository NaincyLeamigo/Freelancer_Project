import "reflect-metadata";
import { DataSource } from "typeorm";
import mongoose from "mongoose";
import {
    PostgresDataSource,
    // sslEnabled,
    DatabaseSource,
    envVal,
    envFlag 
} from "./config";

// // --------- POSTGRES (TypeORM) -----------------
// export const AppDataSource = new DataSource({
//     ...PostgresDataSource,
//     synchronize: false,
//     logging: ["error"],
//     entities: ["src/dbModels/**/*{.ts,.js}"],
//     migrations: ["src/migrations/**/*{.ts,.js}"],
//     subscribers: ["src/subscribers/**/*{.ts,.js}"],
//     // ssl: sslEnabled.isEnabled
//     //     ? { require: true, rejectUnauthorized: false }
//     //     : false,
//       ssl: envFlag("SSL_ENABLED", false) ? { require: true, rejectUnauthorized: false } : false,
// });

// --------- MONGODB (Mongoose) -----------------
class MongoConnection {
    static async init() {
        // const env = envVal("ENV", "dev");
        // const base = DatabaseSource.hostUrl + "?authSource=admin";
        // const dbName = env === "prod" ? "prod" : "dev";
        // const uri = `${base}&dbName=${dbName}&retryWrites=true&w=majority`;

        // try {
        //     await mongoose.connect(uri, { ignoreUndefined: true });
        //     console.log(`✅ MongoDB connected → ${dbName}`);
        // } catch (err) {
        //     console.error("❌ MongoDB connection error:", err);
        // }
        const uri = DatabaseSource.hostUrl;
        try {
            await mongoose.connect(uri, { ignoreUndefined: true });
            console.log(`✅ MongoDB connected → ${uri}`);
        } catch (err) {
            console.error("❌ MongoDB connection error:", err);
        }
    }
}

// --------- MASTER INIT -----------------
export const initDataSources = async () => {
    console.log("⏳ Connecting MongoDB...");
    await MongoConnection.init();

    // console.log("⏳ Connecting PostgreSQL...");
    // await AppDataSource.initialize();
    // console.log("🚀 All Databases Connected Successfully");
     console.log("✅ Databases initialized (Postgres skipped)");
};
