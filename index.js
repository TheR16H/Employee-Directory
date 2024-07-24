const inquirer = require('inquirer');
const express = require('express');
const { getNewEmployee, getNewRole, getNewDepartment, updateEmployee } = require('./sql');

const PORT = process.env.PORT || 3001;
const app = express();
const pool = new Pool({ user: 'postgres', password: 'micha', host: 'localhost', database: 'employee' });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const questions = [{ type: 'list', 
    message: 'What would you like to do?', 
    name: 'choice', 
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'] 
}];

pool.connect();