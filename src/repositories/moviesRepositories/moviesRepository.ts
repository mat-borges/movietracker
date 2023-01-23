import { Movie } from "protocols.js";
import { QueryResult } from "pg";
import { connection } from "../../database/db.js";

async function insertMovie(
  title: string,
  description: string,
  year: number,
  director: number,
  poster: string
): Promise<QueryResult<any>> {
  return connection.query(
    "INSERT INTO movies (title, description, year, director, poster) VALUES ($1, $2, $3, $4, $5) RETURNING id AS movie_id;",
    [title, description, year, director, poster]
  );
}

async function getMovieByName(title: string): Promise<QueryResult<any>> {
  return connection.query("SELECT id AS movie_id FROM movies WHERE title=$1;", [title]);
}

async function getAllMovies(limit: number, offset: number): Promise<QueryResult<Movie>> {
  return connection.query("SELECT * FROM movies LIMIT $1 OFFSET $2;", [limit, offset]);
}

export const moviesRepository = {
  insertMovie,
  getAllMovies,
  getMovieByName,
};
