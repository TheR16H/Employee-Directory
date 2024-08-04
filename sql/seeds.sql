INSERT INTO department (name) 
VALUES ('Marketing'),
       ('Sales'),
       ('Human Resources'),
       ('VP');

INSERT INTO role (title, salary, department_id)
VALUES ('VP Branding', 9000000, 1),
       ('Director of Advertising', 7500000, 2),
       ('Intern', 50000, 3),
       ('Internship', 50001, 3),
       ('Social media assistant', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Jess', 'Bowen', 3, NULL),
       ('Robert', 'Dawson', 4, NULL),
       ('Syxx', 'Singer', 1, 1),
       ('Jewel', 'Reyes', 2, 2),
       ('Tom', 'Fletcher', 5, NULL);
--  ^ this set up is for if manager id means they are manager
--  v this set up is for if its the opposite
        -- ('Jess', 'Bowen', 3, 1), 
        -- ('Robert', 'Dawson', 3, 2),
        -- ('Syxx', 'Singer', 1, NULL), manager
        -- ('Jewel', 'Reyes', 2, NULL), manager
        -- ('Tom', 'Fletcher', 4, NULL);