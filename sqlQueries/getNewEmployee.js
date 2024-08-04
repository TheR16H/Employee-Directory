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
            }
        },
        {
            type: 'input',
            message: 'Enter the last name of the new employee:',
            name: 'lastName',
            validate: function (input) {
                if (input.trim() === '') {
                    return 'Last name cannot be empty. Please enter a valid last name.';
                }
                return true;
            }
        },
        {
            type: 'input',
            message: 'Enter the role ID of the new employee:',
            name: 'roleId',
            validate: function (input) {
                if (isNaN(input) || input.trim() === '') {
                    return 'Role ID must be a number. Please enter a valid role ID.';
                }
                return true;
            }
        },
        {
            type: 'input',
            message: 'Enter the manager ID of the new employee (if applicable):',
            name: 'managerId',
            validate: function (input) {
                if (isNaN(input)) {
                    return 'Manager ID must be a number. Please enter a valid manager ID or leave it empty.';
                }
                return true;
            }
        }
    ]).then(({ firstName, lastName, roleId, managerId }) => {
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId || 'NULL'})`;
        return query;
    });
}

module.exports = getNewEmployee;