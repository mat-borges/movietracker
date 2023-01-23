import { QueryResult } from "pg";
import { connection } from "../../database/db.js";

async function getDirectorByName(name: string): Promise<QueryResult<any>> {
  return connection.query("SELECT id AS director_id FROM directors WHERE name=$1;", [name]);
}

async function newDirector(name: string): Promise<QueryResult<any>> {
  return connection.query("INSERT INTO directors (name) VALUES ($1) RETURNING id AS director_id;", [name]);
}

export const directorRepository = {
  getDirectorByName,
  newDirector,
};
