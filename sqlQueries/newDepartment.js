const inquirer = require('inquirer');

function getNewDepartment() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of the new department:',
            name: 'departmentName',
            validate: function (input) {
                if (input.trim() === '') {
                    return 'Department name cannot be empty. Please enter a valid department name.';
                }
                return true;
            }
        }
    ]).then(({ departmentName }) => {
        const query = `INSERT INTO department (name) VALUES ('${departmentName}')`;
        return query;
    });
}

module.exports = getNewDepartment;