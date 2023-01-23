import { QueryResult } from "pg";
import { connection } from "../../database/db.js";

async function insertActor(name: string): Promise<QueryResult<any>> {
  return connection.query("INSERT INTO actors (name) VALUES ($1) RETURNING id AS actor_id;", [name]);
}

async function getActorByName(name: string): Promise<QueryResult<any>> {
  return connection.query("SELECT id AS actor_id FROM actors WHERE name=$1;", [name]);
}

async function relateActorMovie(movie_id: number, actor_id: number): Promise<QueryResult<any>> {
  return connection.query("INSERT INTO actor_movie (movie_id, actor_id) VALUES ($1, $2);", [movie_id, actor_id]);
}

export const actorsRepository = {
  insertActor,
  getActorByName,
  relateActorMovie,
};
