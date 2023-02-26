---// Create Database //---

CREATE DATABASE pokemon
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE pokemon
    IS 'Project 3 - Pokemon_Catch_Game_Analysis';
	
	