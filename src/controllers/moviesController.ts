import { Response } from "express";
import { actorsRepository } from "../repositories/moviesRepositories/actorsRepository.js";
import { directorRepository } from "../repositories/moviesRepositories/directorsRepository.js";
import { genreRepository } from "../repositories/moviesRepositories/genresRepository.js";

export async function checkDirectorExists(director: string, res: Response): Promise<number | any> {
  try {
    const directorExists = (await directorRepository.getDirectorByName(director)).rows;
    if (directorExists.length !== 0) {
      const { director_id } = directorExists[0];
      return director_id;
    } else {
      const { director_id } = (await directorRepository.newDirector(director)).rows[0];
      return director_id;
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function checkGenresExists(genres: string[], res: Response): Promise<number[] | any> {
  const genres_ids: number[] = [];
  try {
    for (const genre of genres) {
      const genreExists = (await genreRepository.getGenreByName(genre)).rows[0];
      if (genreExists) {
        genres_ids.push(genreExists.genre_id);
      } else {
        const newGenre = (await genreRepository.insertGenre(genre)).rows[0];
        genres_ids.push(newGenre.genre_id);
      }
    }
    return genres_ids;
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function checkActorsExists(actors: string[], res: Response): Promise<number[] | any> {
  const actors_ids: number[] = [];
  try {
    for (const actor of actors) {
      const actorExists = (await actorsRepository.getActorByName(actor)).rows[0];
      if (actorExists) {
        actors_ids.push(actorExists.actor_id);
      } else {
        const newActor = (await actorsRepository.insertActor(actor)).rows[0];
        actors_ids.push(newActor.actor_id);
      }
    }
    return actors_ids;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
