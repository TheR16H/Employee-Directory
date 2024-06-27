CREATE DATABASE rashawn_db;

\c rashawn_db;

CREATE TABLE department (

    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);


CREATE TABLE role (
id SERIAL PRIMARY KEY,
title VARCHAR(30) UNIQUE NOT NULL,
salary DECIAML NOT NULL
);

CREATE TABLE employee (
id SERIAL PRIMARY KEY,
first_name: VARCHAR(30) NOT NULL,
last_name: VARCHAR(30) NOT NULL,
role_id: INT NOT NULL,
manager_id: INT
);
