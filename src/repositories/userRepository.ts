import { QueryResult } from "pg";
import { User } from "../protocols.js";
import { connection } from "../database/db.js";

async function registerUser(name: string, email: string, password: string): Promise<QueryResult<User>> {
  return connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, password]);
}

async function checkEmail(email: string): Promise<QueryResult<any>> {
  return connection.query(`SELECT * FROM users WHERE email=$1`, [email]);
}

const userRepository = {
  registerUser,
  checkEmail,
};

export default userRepository;
