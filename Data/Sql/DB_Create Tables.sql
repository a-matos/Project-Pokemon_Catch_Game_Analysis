----- // Create Tables // ------

CREATE TABLE "pokemon_hp" (
    "Id" INTEGER   NOT NULL,
    "Name" VARCHAR(50)   NOT NULL,
    "Type_1" VARCHAR(50)   NOT NULL,
    "Type_2" VARCHAR(50),
    "Total" INTEGER   NOT NULL,
    "HP" INTEGER   NOT NULL,
    "Attack" INTEGER   NOT NULL,
    "Defense" INTEGER   NOT NULL,
    "Sp_Atk" INTEGER   NOT NULL,
    "Sp_Def" INTEGER   NOT NULL,
    "Speed" INTEGER   NOT NULL,
    "Generation" INTEGER   NOT NULL,
    "Legendary" BOOLEAN   NOT NULL
);

CREATE TABLE "pokemon_names" (
    "Id" INTEGER   NOT NULL,
    "Names" VARCHAR(50)   NOT NULL,
    CONSTRAINT "pk_pokemon_names" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "pk_catch" (
    "pokemonId" INTEGER   NOT NULL,
    "latitude" FLOAT   NOT NULL,
    "longitude" FLOAT   NOT NULL,
    "appearedTimeOfDay" VARCHAR(50)   NOT NULL,
    "appearedDayOfWeek" VARCHAR(50)   NOT NULL,
    "appearedDay" INTEGER   NOT NULL,
    "appearedMonth" INTEGER   NOT NULL,
    "appearedYear" INTEGER   NOT NULL,
    "closeToWater" BOOLEAN   NOT NULL,
    "city" VARCHAR(50)   NOT NULL,
    "continent" VARCHAR(50)   NOT NULL,
    "weather" VARCHAR(50)   NOT NULL,
    "temperature" DECIMAL(112)   NOT NULL,
    "windSpeed" DECIMAL(112)   NOT NULL,
    "windBearing" INTEGER   NOT NULL,
    "pressure" VARCHAR(50)   NOT NULL,
    "weatherIcon" VARCHAR(50)   NOT NULL,
    "population_density" FLOAT   NOT NULL,
    "gymIn1000m" BOOLEAN   NOT NULL,
    "gymIn2500m" BOOLEAN   NOT NULL,
    "gymIn5000m" BOOLEAN   NOT NULL,
    "pokestopIn1000m" BOOLEAN   NOT NULL,
    "pokestopIn2500m" BOOLEAN   NOT NULL,
    "pokestopIn5000m" BOOLEAN   NOT NULL
);

ALTER TABLE "pk_catch" ADD CONSTRAINT "fk_pk_catch_pokemonId" FOREIGN KEY("pokemonId")
REFERENCES "pokemon_names" ("Id");

