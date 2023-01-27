CREATE TABLE users (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE tracker (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"user_id" INTEGER NOT NULL,
	"movie_id" INTEGER NOT NULL,
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
	"title" TEXT NOT NULL UNIQUE,
	"description" TEXT NOT NULL,
	"year" INTEGER NOT NULL,
	"director_id" INTEGER NOT NULL,
	"poster" TEXT NOT NULL
);

CREATE TABLE genres (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "_GenresToMovies" (
	"A" INTEGER NOT NULL,
	"B" INTEGER NOT NULL
);

CREATE TABLE actors (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "_ActorsToMovies" (
	"A" INTEGER NOT NULL,
	"B" INTEGER NOT NULL
);

CREATE TABLE directors (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" TEXT NOT NULL UNIQUE
);

CREATE TABLE watched (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"user_id" INTEGER NOT NULL,
	"movie_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE "tracker" ADD CONSTRAINT "tracker_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "tracker" ADD CONSTRAINT "tracker_fk1" FOREIGN KEY ("movie_id") REFERENCES "movies"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "movies" ADD CONSTRAINT "movies_fk0" FOREIGN KEY ("director_id") REFERENCES "directors"("id");

ALTER TABLE "_GenresToMovies" ADD CONSTRAINT "_GenresToMovies_fk0" FOREIGN KEY ("A") REFERENCES "movies"("id");
ALTER TABLE "_GenresToMovies" ADD CONSTRAINT "_GenresToMovies_fk1" FOREIGN KEY ("B") REFERENCES "genres"("id");
CREATE UNIQUE INDEX "_GenresToMovies_AB_unique" ON "_GenresToMovies"("A" int4_ops,"B" int4_ops);
CREATE INDEX "_GenresToMovies_B_index" ON "_GenresToMovies"("B" int4_ops);

ALTER TABLE "_ActorsToMovies" ADD CONSTRAINT "_ActorsToMovies_fk0" FOREIGN KEY ("A") REFERENCES "movies"("id");
ALTER TABLE "_ActorsToMovies" ADD CONSTRAINT "_ActorsToMovies_fk1" FOREIGN KEY ("B") REFERENCES "actors"("id");
CREATE UNIQUE INDEX "_ActorsToMovies_AB_unique" ON "_ActorsToMovies"("A" int4_ops,"B" int4_ops);
CREATE INDEX "_ActorsToMovies_B_index" ON "_ActorsToMovies"("B" int4_ops);


ALTER TABLE "watched" ADD CONSTRAINT "watched_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "watched" ADD CONSTRAINT "watched_fk1" FOREIGN KEY ("movie_id") REFERENCES "movies"("id");