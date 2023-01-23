import pg, { Pool } from 'pg';

export const connection: Pool = new pg.Pool({
  user: 'postgres',
  password: 'naolembro',
  host: 'localhost',
  port: 5432,
  database: 'teste',
});
