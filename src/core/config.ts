import dotenv from "dotenv";

dotenv.config();

const env = (key: string, _default: string) => process.env[key] || _default;
const envNum = (key: string, _default: number) =>
    Number(process.env[key]) || _default;
const envBool = (key: string, _default: boolean) =>
    process.env[key] ? process.env[key] === "true" : _default;

const config = {
    SERVER_PORT: envNum("SERVER_PORT", 4000),
    SERVER_HOST: env("SERVER_HOST", "127.0.0.1"),
    DEV: envBool("DEV", false),
    DB_TYPE: env("DB_TYPE", "mysql"),
    DB_HOST: env("DB_HOST", "127.0.0.1"),
    DB_PORT: envNum("DB_PORT", 3306),
    DB_USERNAME: env("DB_USERNAME", "user"),
    DB_PASSWORD: env("DB_PASSWORD", "password"),
    DB_DATABASE: env("DB_DATABASE", "db"),
    DB_SYNCHRONIZE: envBool("DB_SYNCHRONIZE", true),
    DB_LOGGING: envBool("DB_LOGGING", false),
};

export { config };
