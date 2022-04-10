import fastify from "fastify";

import { config } from "./config";

const App = fastify();

if (config.DEV) {
    App.addHook("onRequest", (req, _, done) => {
        console.log(`[${req.method}] ${req.url}`);
        done();
    });
}

App.listen(config.SERVER_PORT, config.SERVER_HOST, (err, address) => {
    if (err) {
        console.error(`[WebServer] ${err}`);
        process.exit(1);
    }
    console.log(`[WebServer] Server listening at ${address}`);
});

export { App };
