SELECT *
FROM pk_catch;


SELECT *
FROM pokemon_names;

ALTER TABLE pk_catch
ADD COLUMN pokemon_name VARCHAR;

ALTER TABLE pk_catch
RENAME COLUMN pokemonId TO pokemonid;

ALTER TABLE pokemon_names
RENAME COLUMN ID TO pk_id;

ALTER TABLE pokemon_names
RENAME COLUMN Names TO pk_names;


UPDATE pk_catch 
SET pokemon_name = pokemon_names.pk_names
FROM pokemon_names 
WHERE pokemon_names.pk_id = pk_catch.pokemonid