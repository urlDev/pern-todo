-- This file is not necessary 
-- but it shows what we did in terms of creating db
CREATE DATABASE pernUserTodo;
-- Serial is for incrementing it each time
    -- Primary key is for making it unique
    -- Max character in 255
CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    user_id SERIAL NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id));

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT,
    email TEXT NOT NULL,
    password TEXT NOT NULL);
