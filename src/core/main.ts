import express from "express";
import cors from "cors";

const app = express();
app.set("trust proxy", true);
app.disable("x-powered-by");
app.use(express.json());
app.use(cors());

// For requests debug
app.use((req, _, next) => {
    console.log(req.url);
    next();
});

const port = 4000;
app.listen(port, () => {
    console.log(`API Server listening at ${port} port`);
});

export default app;
