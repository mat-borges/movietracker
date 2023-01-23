import express, { json } from "express";

import authRouter from "./routers/authRouter.js";
import cors from "cors";
import dotenv from "dotenv";
import moviesRouter from "./routers/moviesRouter.js";
import { stripHtml } from "string-strip-html";

export const cleanStringData = (string: any) => stripHtml(JSON.stringify(string)?.replace(/"|"/gi, ``)).result.trim();

dotenv.config();

const server = express();

server.use(cors()).use(json()).use(authRouter).use(moviesRouter);

const port: string = String(process.env.PORT);
server.listen(port, () => console.log(`Running server on http://locahost:${port}`));
