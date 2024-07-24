-- some pre-establish date will go here to round out
-- each table

INSERT INTO department (first_name, last_name, salary) 
VALUES ('Marketing'),
('Sales'),
('Human Resources'),
('EVP');
INSERT INTO role (title, salary, department)
 VALUES ('VP Branding', 9000000, 1),
        ('Director of Advertising', 7500000, 2),
        ('Intern', 50000, 3),
        ('Intern', 50001, 3),
        ('Social media assistant',60000 , 4); 

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES  ('f', 'l', 3, NULL),
        ('f', 'l', 3, NULL),
        ('f', 'l', 1, 1),
        ('f', 'l', 2, 2),
        ('f', 'l', 4, NULL);
--  ^ this set up is for if manager id means they are manager
--  v this set up is for if its the opposite
        -- ('f', 'l', 3, 1), 
        -- ('f', 'l', 3, 2),
        -- ('f', 'l', 1, NULL),
        -- ('f', 'l', 2, NULL),
        -- ('f', 'l', 4, NULL);