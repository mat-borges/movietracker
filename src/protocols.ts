export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
};

export type Movie = {
  title: string;
  description: string;
  year: number;
  poster: string;
  director: string;
  genres: string[];
  actors: string[];
};

export type MovieFromDb = Omit<Movie, "director" | "genres" | "actors"> & {
  id?: number;
  director: number;
  genres: number[];
  actors: number[];
};
