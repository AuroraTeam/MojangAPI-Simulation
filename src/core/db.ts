import "reflect-metadata";

import { createConnection } from "typeorm";

import { User } from "../entities/User";
import { config } from "./config";

type AvailableDatabaseType =
    | "mysql"
    | "postgres"
    | "cockroachdb"
    | "sap"
    | "mariadb"
    | "sqlite"
    | "oracle"
    | "mssql"
    | "mongodb"
    | "better-sqlite3";

console.log("[DB] Start connection.");
createConnection({
    type: <AvailableDatabaseType>config.DB_TYPE,
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    entities: [User],
    synchronize: config.DB_SYNCHRONIZE,
    logging: config.DB_LOGGING,
})
    .then((_) => {
        console.log("[DB] Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("[DB] Unable to connect to the database:", err);
        process.exit(1);
    });
