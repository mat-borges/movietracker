import { Request, Response } from "express";
import { checkActorsExists, checkDirectorExists, checkGenresExists } from "../controllers/moviesController.js";

import { Movie } from "../protocols.js";
import { actorsRepository } from "../repositories/moviesRepositories/actorsRepository.js";
import { genreRepository } from "../repositories/moviesRepositories/genresRepository.js";
import { moviesRepository } from "../repositories/moviesRepositories/moviesRepository.js";

export async function insertNewMovie(req: Request, res: Response) {
  const { title, description, year, genres, director, actors, poster }: Movie = res.locals.movie;
  try {
    const director_id: number = await checkDirectorExists(director, res);
    const genres_ids: number[] = await checkGenresExists(genres, res);
    const actors_ids: number[] = await checkActorsExists(actors, res);
    const { movie_id }: { movie_id: number } = (
      await moviesRepository.insertMovie(title, description, year, director_id, poster)
    ).rows[0];

    for (const genre_id of genres_ids) {
      await genreRepository.relateGenreMovie(movie_id, genre_id);
    }
    for (const actor_id of actors_ids) {
      await actorsRepository.relateActorMovie(movie_id, actor_id);
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
