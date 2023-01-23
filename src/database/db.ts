import pg from "pg";

const { Pool } = pg;

// export const connection: Pool = new Pool({
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   host: process.env.PGHOST,
//   port: Number(process.env.PGPORT),
//   database: process.env.PGUDATABASE,
// });

export const connection: pg.Pool = new Pool({ connectionString: process.env.DATABASE_URL });
