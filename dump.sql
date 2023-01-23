CREATE TABLE users (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE wishlist (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"user_id" INTEGER NOT NULL,
	"movie_id" INTEGER NOT NULL,
	"rate" INTEGER NOT NULL,
	"watched" BOOLEAN NOT NULL DEFAULT false,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"user_id" INTEGER NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE movies (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"title" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"year" INTEGER NOT NULL,
	"director" INTEGER NOT NULL,
);

CREATE TABLE genres (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" TEXT NOT NULL
);

CREATE TABLE movie_genre (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"movie_id" INTEGER NOT NULL,
	"genre_id" INTEGER NOT NULL
);

CREATE TABLE actors (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" TEXT NOT NULL,
	"birthday" TIMESTAMP NOT NULL
);

CREATE TABLE actor_movie (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"movie_id" INTEGER NOT NULL,
	"actor_id" INTEGER NOT NULL
);

CREATE TABLE director_movie (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"movie_id" INTEGER NOT NULL,
	"director_id" INTEGER NOT NULL
);

CREATE TABLE directors (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" TEXT NOT NULL
);

CREATE TABLE watched (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"user_id" INTEGER NOT NULL,
	"movie_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_fk1" FOREIGN KEY ("movie_id") REFERENCES "movies"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "movies" ADD CONSTRAINT "movies_fk0" FOREIGN KEY ("director") REFERENCES "directors"("id");

ALTER TABLE "movie_genre" ADD CONSTRAINT "movie_genre_fk0" FOREIGN KEY ("movie_id") REFERENCES "movies"("id");
ALTER TABLE "movie_genre" ADD CONSTRAINT "movie_genre_fk1" FOREIGN KEY ("genre_id") REFERENCES "genres"("id");

ALTER TABLE "actor_movie" ADD CONSTRAINT "actor_movie_fk0" FOREIGN KEY ("movie_id") REFERENCES "movies"("id");
ALTER TABLE "actor_movie" ADD CONSTRAINT "actor_movie_fk1" FOREIGN KEY ("actor_id") REFERENCES "actors"("id");

ALTER TABLE "watched" ADD CONSTRAINT "watched_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "watched" ADD CONSTRAINT "watched_fk1" FOREIGN KEY ("movie_id") REFERENCES "movies"("id");

































