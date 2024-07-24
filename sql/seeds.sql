-- some pre-establish date will go here to round out
-- each table

INSERT INTO department (first_name, last_name, salary) 
VALUES ('Marketing'),
('Sales'),
('Human Resources'),
('Human Resources');
INSERT INTO role (title, salary, department)
 VALUES (f, 2, 1),
        (f, 2, 2),
        (f, 2, 3),
        (f, 2, 3),
        (f, 2, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES  (f, l, 2, 1),
        (f, l, 3, 2),
        (f, l, 1, NULL),
        (f, l, 4, NULL),
        (f, l, 2, NULL);