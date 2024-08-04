const inquirer = require('inquirer');
const { Client } = require('pg');
require('dotenv').config();


// In-memory data storage
let employees = [];
let roles = [];
let departments = [];

const questions = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'choice',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
}];

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect()
    .then(() => {
        console.log('Connected to the database');
        init(); // Start the application after connecting to the database
    })
    .catch(err => console.error('Error connecting to the database:', err));

function handleUserChoice(choice) {
    switch (choice) {
        case 'View All Employees':
            console.table(employees);
            break;
        case 'Add Employee':
            getNewEmployee().then(employee => {
                employees.push(employee);
                console.log('Employee added successfully.');
                init(); // Prompt for the next action
            });
            break;
        case 'Update Employee Role':
            // Implement update employee role functionality
            break;
        case 'View all Roles':
            console.table(roles);
            init(); // Prompt for the next action
            break;
        case 'Add Role':
            getNewRole().then(role => {
                roles.push(role);
                console.log('Role added successfully.');
                init(); // Prompt for the next action
            });
            break;
        case 'View All Departments':
            console.table(departments);
            init(); // Prompt for the next action
            break;
        case 'Add Department':
            getNewDepartment().then(department => {
                departments.push(department);
                console.log('Department added successfully.');
                init(); // Prompt for the next action
            });
            break;
        case 'Quit':
            process.exit();
            break;
        default:
            console.log('Invalid choice. Please select a valid option.');
            init(); // Prompt for the next action
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
        {   type: 'input',
            message: 'Enter the department id:',
            name: 'role_id'
        },
        {   type: 'input',
            message: 'Enter the Manger ID (If NULL Leave blank):',
            name: 'manager_id'
        }
    ]);
}

function getNewRole() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the role title:',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Enter the role salary:',
            name: 'salary'
        },
       {   type: 'input',
            message: 'Enter the department id:',
            name: 'department_id'
        }
    ]);
}

function getNewDepartment() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the department name:',
            name: 'name'
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
// init();