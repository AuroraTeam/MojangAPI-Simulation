import dotenv from "dotenv";
import fastify from "fastify";

dotenv.config();
const app = fastify();

if (process.env.DEV) {
    app.addHook("onRequest", (req, _, done) => {
        console.log(`[${req.method}] ${req.url}`);
        done();
    });

    app.register(require("fastify-swagger"), {
        routePrefix: "/docs",
        swagger: {
            info: {
                title: "MojangAPI-Simulation",
                description: "Симуляция Mojang API",
                version: "0.3.0",
            },
            tags: [
                {
                    name: "authHost",
                    description: "https://authserver.mojang.com",
                },
                {
                    name: "accountsHost",
                    description: "https://api.mojang.com",
                },
                {
                    name: "sessionHost",
                    description: "https://sessionserver.mojang.com",
                },
                {
                    name: "servicesHost",
                    description: "https://api.minecraftservices.com",
                },
            ],
        },
        exposeRoute: true,
    });
}

app.listen(4000, (err, address) => {
    if (err) {
        console.error(`[WebServer] ${err}`);
        process.exit(1);
    }
    console.log(`[WebServer] Server listening at ${address}`);
});

export default app;
