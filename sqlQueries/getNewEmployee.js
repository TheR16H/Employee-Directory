const inquirer = require('inquirer');

function getNewEmployee() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the first name of the new employee:',
            name: 'firstName',
            validate: function (input) {
                if (input.trim() === '') {
                    return 'First name cannot be empty. Please enter a valid first name.';
                }
                return true;
module.exports = getNewEmployee;