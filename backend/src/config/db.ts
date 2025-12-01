import { Pool } from "pg";
import { PostgresDataSource } from "./config";

const pool = new Pool({
    host: PostgresDataSource.host,
    port: PostgresDataSource.port,
    user: PostgresDataSource.username,
    password: PostgresDataSource.password,
    database: PostgresDataSource.database,
    ssl: { rejectUnauthorized: false },
    max: 50,
});

pool.on("connect", () => {
    console.log("PostgreSQL Pool Connected");
});

export default pool;
