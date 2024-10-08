CREATE PROCEDURE SeedDepartments()
AS
BEGIN
    INSERT INTO department (name) 
    VALUES ('Marketing'),
           ('Sales'),
           ('Human Resources'),
           ('VP');
END;

-- role seeds
CREATE PROCEDURE SeedRoles()
AS
BEGIN
    INSERT INTO role (title, salary, department_id)
    VALUES ('VP Branding', 9000000, 1),
           ('Director of Advertising', 7500000, 2),
           ('Intern', 50000, 3),
           ('Internship', 50001, 3),
           ('Social media assistant', 60000, 4);
END;

-- employee seeds
CREATE PROCEDURE SeedEmployees()
AS
BEGIN
    INSERT INTO employees (first_name, last_name, role_id, manager_id) 
    VALUES ('Jess', 'Bowen', 3, NULL),
           ('Robert', 'Dawson', 4, NULL),
           ('Syxx', 'Singer', 1, 1),
           ('Jewel', 'Reyes', 2, 2),
           ('Tom', 'Fletcher', 5, NULL);
END;