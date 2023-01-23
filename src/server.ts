import express, { json } from "express";

import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors()).use(json());

const port = process.env.PORT;
app.listen(port, () => console.log(`Running server on http://locahost:${port}`));
