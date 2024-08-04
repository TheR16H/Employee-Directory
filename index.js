const inquirer = require('inquirer');
const express = require('express');
const getNewEmployee = require('./sqlQueries/getNewEmployee.js');
const NewRole = require('./sqlQueries/newRole.js');
const newDepartment = require('./sqlQueries/newDepartment.js');
const updateEmployee = require('./sqlQueries/updateEmployee.js');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const questions = [{ 
    type: 'list', 
    message: 'What would you like to do?', 
    name: 'choice', 
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'] }];


function handleUserChoice(choice) {
    let sql = '';
    switch (choice) {
        case 'View All Employees':
            sql = `SELECT e.id, e.first_name, e.last_name, r.department, r.salary, e.manager_id, d.name FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department = d.id`;
            break;
        case 'Add Employee':
            getNewEmployee().then(query => executeQuery(query));
            break;
        case 'Update Employee Role':
            updateEmployee().then(query => executeQuery(query));
            break;
        case 'View all Roles':
            sql = 'SELECT * FROM role';
            break;
        case 'Add Role':
            getNewRole().then(query => executeQuery(query));
            break;
        case 'View All Departments':
            sql = 'SELECT * FROM department';
            break;
        case 'Add Department':
            getNewDepartment().then(query => executeQuery(query));
            break;
        default:
            process.exit();
    }
    if (sql) {
        executeQuery(sql);
    }
}

function executeQuery(sql) {
    pool.query(sql, (err, { rows }) => {
        if (err) {
            console.error('Error executing query:', err);
        } else {
            console.table(rows);
        }
    });
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

console.log(artBanner()); 
init();