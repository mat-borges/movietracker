import { QueryResult } from "pg";
import { connection } from "../../database/db.js";

async function insertGenre(genre: string): Promise<QueryResult<any>> {
  return connection.query("INSERT INTO genres (name) VALUES ($1) RETURNING id AS genre_id;", [genre]);
}

async function getGenreByName(genre: string): Promise<QueryResult<any>> {
  return connection.query("SELECT id AS genre_id FROM genres WHERE name=$1;", [genre]);
}

async function relateGenreMovie(movie_id: number, genre_id: number): Promise<QueryResult<any>> {
  return connection.query("INSERT INTO movie_genre (movie_id, genre_id) VALUES ($1, $2);", [movie_id, genre_id]);
}

export const genreRepository = {
  insertGenre,
  getGenreByName,
  relateGenreMovie,
};
