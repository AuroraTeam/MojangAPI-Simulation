import fastify from "fastify";

const app = fastify();

// app.addHook("onRequest", (req, _, done) => {
//     console.log(`[${req.method}] ${req.url}`);
//     done();
// });

app.listen(4000, (err, address) => {
    if (err) {
        console.error(`[WebServer] ${err}`);
        process.exit(1);
    }
    console.log(`[WebServer] Server listening at ${address}`);
});

export default app;
