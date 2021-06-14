import "reflect-metadata";

import { createConnection } from "typeorm";

console.log("[DB] Start connection.");
createConnection({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "root",
    database: "test",
    entities: [__dirname + "/../entity/*.ts"],
    synchronize: true,
    logging: false,
})
    .then((_) => {
        console.log("[DB] Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("[DB] Unable to connect to the database:", err);
    });
