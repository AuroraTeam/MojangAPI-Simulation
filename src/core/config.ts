import dotenv from "dotenv";

dotenv.config();

const config = {
    SERVER_PORT: process.env.SERVER_PORT || "4000",
    SERVER_HOST: process.env.SERVER_HOST || "127.0.0.1",
    DEV: process.env.DEV || false,
};

export { config };
