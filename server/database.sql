-- This file is not necessary 
-- but it shows what we did in terms of creating db
CREATE DATABASE perntodo;

CREATE TABLE todo(
    -- Serial is for incrementing it each time
    -- Primary key is for making it unique
    todo_id SERIAL PRIMARY KEY,
    -- Max character in 255
    description VARCHAR(255)
)