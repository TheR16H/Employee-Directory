const inquirer = require('inquirer');
const express = require('express');
const { Pool } = require('pg');
const { getNewEmployee, newRole, newDepartment, updateEmployee } = require('./sql');

const app = express();
const pool = new Pool({ user: 'postgres', password: 'micha', host: 'localhost', database: 'employee' });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const questions = [{ 
    type: 'list', 
    message: 'What would you like to do?', 
    name: 'choice', 
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'] }];

pool.connect();
function handleUserChoice(choice) {
    let sql = '';
    switch (choice) {
        case 'View All Employees':
            sql = `SELECT e.id, e.first_name, e.last_name, r.department, r.salary, e.manager_id, d.name FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department = d.id`;
            break;
        case 'Add Employee':
            getNewEmployee().then(sql => executeQuery(sql));
            break;
        case 'Update Employee Role':
            updateEmployee().then(sql => executeQuery(sql));
            break;
        case 'View all Roles':
            sql = 'SELECT * FROM role';
            break;
        case 'Add Role':
            getNewRole().then(sql => executeQuery(sql));
            break;
        case 'View All Departments':
            sql = 'SELECT * FROM department';
            break;
        case 'Add Department':
            getNewDepartment().then(sql => executeQuery(sql));
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
            console.log(err);
        } else {
            console.table(rows);
        }
    });
}

function init() {
    inquirer.prompt(questions).then(({ choice }) => {
        console.log(choice);
        handleUserChoice(choice);
    }).catch(error => {
        if (error.isTtyError) {
            console.log('Prompt couldn\'t be rendered in the current environment');
        } else {
            console.log('Something went wrong');
        }
    });
}

console.log(artBanner());
init();