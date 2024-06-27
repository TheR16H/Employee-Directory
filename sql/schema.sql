CREATE DATABASE rashawn_db;

\c rashawn_db;

CREATE TABLE department (

    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);
-- name: to hold department name

-- -- -- -- -- -- -- -- -- --

CREATE TABLE role (
id SERIAL PRIMARY KEY
title VARCHAR(30) UNIQUE NOT NULL
salary DECIAML NOT NULL
);
-- title: to hold role title
-- salary:to hold role salary
-- department_id - to hold reference to department role belongs to


-- -- -- -- -- -- -- -- -- --

CREATE TABLE employee (
id --same
first name 
);
 `employee`

  * `id`: `SERIAL PRIMARY KEY`

  * `first_name`: `VARCHAR(30) NOT NULL` to hold employee first name

  * `last_name`: `VARCHAR(30) NOT NULL` to hold employee last name

  * `role_id`: `INTEGER NOT NULL` to hold reference to employee role

  * `manager_id`: `INTEGER` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)
