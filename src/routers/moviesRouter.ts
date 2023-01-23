import { Request, Response, Router } from "express";
import { checkMovieExists, validateMovieSchema } from "../middlewares/moviesMiddlewares/moviesMiddleware.js";

import { insertNewMovie } from "../services/moviesServices.js";

const router = Router();

router
  .post("/movies", validateMovieSchema, checkMovieExists, insertNewMovie)
  .get("/movies", (req: Request, res: Response) => res.sendStatus(501))
  .put("/movie/:id", (req: Request, res: Response) => res.sendStatus(501));

export default router;
