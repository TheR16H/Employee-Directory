// const inquirer = require('inquirer');
// const { Client } = require('pg');
// require('dotenv').config();


// // In-memory data storage
// let employees = [];
// let roles = [];
// let departments = [];

// const questions = [{
//     type: 'list',
//     message: 'What would you like to do?',
//     name: 'choice',
//     choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
// }];

// const client = new Client({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// client.connect()
//     .then(() => {
//         console.log('Connected to the database');
//         init(); // Start the application after connecting to the database
//     })
//     .catch(err => console.error('Error connecting to the database:', err));

// function handleUserChoice(choice) {
//     switch (choice) {
//         case 'View All Employees':
//             console.table(employees);
//             break;
//         case 'Add Employee':
//             getNewEmployee().then(employee => {
//                 employees.push(employee);
//                 console.log('Employee added successfully.');
//                 init(); // Prompt for the next action
//             });
//             break;
//         case 'Update Employee Role':
//             // Implement update employee role functionality
//             break;
//         case 'View all Roles':
//             console.table(roles);
//             init(); // Prompt for the next action
//             break;
//         case 'Add Role':
//             getNewRole().then(role => {
//                 roles.push(role);
//                 console.log('Role added successfully.');
//                 init(); // Prompt for the next action
//             });
//             break;
//         case 'View All Departments':
//             console.table(departments);
//             init(); // Prompt for the next action
//             break;
//         case 'Add Department':
//             getNewDepartment().then(department => {
//                 departments.push(department);
//                 console.log('Department added successfully.');
//                 init(); // Prompt for the next action
//             });
//             break;
//         case 'Quit':
//             process.exit();
//             break;
//         default:
//             console.log('Invalid choice. Please select a valid option.');
//             init(); // Prompt for the next action
//     }
// }

// function getNewEmployee() {
//     return inquirer.prompt([
//         {
//             type: 'input',
//             message: 'Enter the employee first name:',
//             name: 'firstName'
//         },
//         {
//             type: 'input',
//             message: 'Enter the employee last name:',
//             name: 'lastName'
//         },
//         {   type: 'input',
//             message: 'Enter the department id:',
//             name: 'role_id'
//         },
//         {   type: 'input',
//             message: 'Enter the Manger ID (If NULL Leave blank):',
//             name: 'manager_id'
//         }
//     ]);
// }

// function getNewRole() {
//     return inquirer.prompt([
//         {
//             type: 'input',
//             message: 'Enter the role title:',
//             name: 'title'
//         },
//         {
//             type: 'input',
//             message: 'Enter the role salary:',
//             name: 'salary'
//         },
//        {   type: 'input',
//             message: 'Enter the department id:',
//             name: 'department_id'
//         }
//     ]);
// }

// function getNewDepartment() {
//     return inquirer.prompt([
//         {
//             type: 'input',
//             message: 'Enter the department name:',
//             name: 'name'
//         }
//     ]);
// }
// function init() {
//     inquirer.prompt(questions).then(({ choice }) => {
//         console.log('Selected choice:', choice);
//         handleUserChoice(choice);
//     }).catch(error => {
//         if (error.isTtyError) {
//             console.error('Prompt couldn\'t be rendered in the current environment');
//         } else {
//             console.error('Something went wrong:', error);
//         }
//     });
// }
// // init();

const inquirer = require('inquirer');
const { Pool } = require('pg');
require('dotenv').config();

const questions = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'choice',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Delete Employee','Delete Role','Delete Department','Quit']
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
        init(); // Start the application after connecting to the database
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

function handleUserChoice(choice) {
    switch (choice) {
        case 'View All Employees':
            pool.query('SELECT * FROM employees', (err, result) => {
                if (err) {
                    console.error('Error fetching employees:', err);
                    return;
                }
                console.table(result.rows);
                init(); // Prompt for the next action
            });
            break;
            case 'View all Roles':
                pool.query('SELECT * FROM role', (err, result) => {
                    if (err) {
                        console.error('Error fetching roles:', err);
                        return;
                    }
                    console.table(result.rows);
                    init(); // Prompt for the next action
                });
                break;
                case 'View All Departments':
                    pool.query('SELECT * FROM department', (err, result) => {
                        if (err) {
                            console.error('Error fetching departments:', err);
                            return;
                        }
                        console.table(result.rows);
                        init(); // Prompt for the next action
                    });
                    break;
        case 'Add Employee':
            getNewEmployee().then(employee => {
                pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [employee.firstName, employee.lastName, employee.role_id, employee.manager_id], (err) => {
                    if (err) {
                        console.error('Error adding employee:', err);
                        return;
                    }
                    console.log('Employee added successfully.');
                    init(); // Prompt for the next action
                });
            });
            break;
            case 'Quit':
            console.log('Exiting the application. Goodbye!');
            
            break;
            case 'Delete Employee':
                promptForID('employee').then(employeeID => {
                    deleteEmployee(employeeID);
                });
                break;
        //         case 'Delete Role':
        //             promptForID('role').then(roleID => {
        //                 deleteRole(roleID);
        //             });
        //             break;
                
        //         case 'Delete Department':
        //             promptForID('department').then(departmentID => {
        //                 deleteDepartment(departmentID);
        //             });
        //             break;
        // case 'Quit':
            console.log('Exiting the application. Goodbye!');
            break;
        default:
            console.log('Invalid choice. Please select a valid option.');
            init(); // Prompt for the next action
    }
}
        // dear rashawn remember to  cases for other actions like Update Employee Role, View all Roles, Add Role, View All Departments, Add Department

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