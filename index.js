const inquirer = require('inquirer');
const { Pool } = require('pg');
require('dotenv').config();

const questions = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'choice',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Delete Employee', 'Delete Role', 'Delete Department', 'View Employees by Department', 'Quit']
}];

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect()
    .then(() => {
        console.log('Connected to the database');
        init();
    })
    .catch(err => console.error('Error connecting to the database:', err));


function promptForID(entity) {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: `Enter the ID of the ${entity} you want to delete:`,
        }
    ]).then(answer => {
        return answer.id;
    });
}
function deleteEmployee(employeeID) {
    pool.query('DELETE FROM employees WHERE id = $1', [employeeID], (err) => {
        if (err) {
            console.error('Error deleting employee:', err);
            return;
        }
        console.log('Employee deleted successfully.');
        init();
    });
}
function viewEmployeesByDepartment() {
    pool.query('SELECT DISTINCT name FROM department', (err, result) => {
        if (err) {
            console.error('Error fetching departments:', err);
            return;
        }

        const departments = result.rows.map(row => row.name);

        inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Select a department to view employees:',
                choices: departments
            }
        ]).then(({ department }) => {
            pool.query('SELECT employees.first_name, employees.last_name, role.title, department.name AS department FROM employees INNER JOIN role ON employees.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.name = $1', [department], (err, result) => {
                if (err) {
                    console.error('Error fetching employees by department:', err);
                    return;
                }
                console.table(result.rows);
                init();  // Return to the main menu after displaying employees by department
            });
        });
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        }
    ]).then(answer => {
        const { name } = answer;
        pool.query('INSERT INTO department (name) VALUES ($1)', [name], (err) => {
            if (err) {
                console.error('Error adding department:', err);
                return;
            }
            console.log('Department added successfully.');
            init();
        });
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role:'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID for the role:'
        }
    ]).then(answer => {
        const { title, salary, department_id } = answer;
        pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id], (err) => {
            if (err) {
                console.error('Error adding role:', err);
                return;
            }
            console.log('Role added successfully.');
            init();
        });
    });
}

function handleUserChoice(choice) {
    switch (choice) {
        case 'View All Employees':
            pool.query('SELECT * FROM employees', (err, result) => {
                if (err) {
                    console.error('Error fetching employees:', err);
                    return;
                }
                console.table(result.rows);
                init();
            });
            break;
        case 'View all Roles':
            pool.query('SELECT * FROM role', (err, result) => {
                if (err) {
                    console.error('Error fetching roles:', err);
                    return;
                }
                console.table(result.rows);
                init();
            });
            break;
        case 'View All Departments':
            pool.query('SELECT * FROM department', (err, result) => {
                if (err) {
                    console.error('Error fetching departments:', err);
                    return;
                }
                console.table(result.rows);
                init();
            });
            break;
           case 'Add Department':
    addDepartment();
    break;
case 'Add Role':
    addRole();
    break;
        case 'Add Employee':
            getNewEmployee().then(employee => {
                pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [employee.firstName, employee.lastName, employee.role_id, employee.manager_id], (err) => {
                    if (err) {
                        console.error('Error adding employee:', err);
                        return;
                    }
                    console.log('Employee added successfully.');
                    init();
                });
            });
            break;
        case 'Quit':
            console.log('Exiting the application. Goodbye!');

            break;
        case 'View Employees by Department':
            viewEmployeesByDepartment();
            break;
        case 'Delete Employee':
            promptForID('employee').then(employeeID => {
                deleteEmployee(employeeID);
            });
            break;
            console.log('Exiting the application. Goodbye!');
            break;
        default:
            console.log('Invalid choice. Please select a valid option.');
            init();
    }
}
function getNewEmployee() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the employee first name:',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Enter the employee last name:',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'Enter the role id:',
            name: 'role_id'
        },
        {
            type: 'input',
            message: 'Enter the Manager ID (If NULL Leave blank):',
            name: 'manager_id'
        }
    ]);
}

function init() {
    inquirer.prompt(questions).then(({ choice }) => {
        console.log('Selected choice:', choice);
        handleUserChoice(choice);
    }).catch(error => {
        if (error.isTtyError) {
            console.error('Prompt couldn\'t be rendered in the current environment');
        } else {
            console.error('Something went wrong:', error);
        }
    });
}