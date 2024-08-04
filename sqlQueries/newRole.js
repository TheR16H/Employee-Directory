// INSERT INTO department (id, name)
// VALUES 
// ();

// INSERT INTO role (id, name)
// VALUES 
// ();

// INSERT INTO employee (id, name)
// VALUES 
// ();

const inquirer = require('inquirer');

function getNewRole() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the title of the new role:',
            name: 'title',
            validate: function (input) {
                if (input.trim() === '') {
                    return 'Role title cannot be empty. Please enter a valid title.';
                }
                return true;
            }
        },
        {
            type: 'input',
            message: 'Enter the salary of the new role:',
            name: 'salary',
            validate: function (input) {
                if (isNaN(input) || input.trim() === '') {
                    return 'Salary must be a number. Please enter a valid salary.';
                }
                return true;
            }
        },
        {
            type: 'input',
            message: 'Enter the department ID of the new role:',
            name: 'departmentId',
            validate: function (input) {
                if (isNaN(input) || input.trim() === '') {
                    return 'Department ID must be a number. Please enter a valid department ID.';
                }
                return true;
            }
        }
    ]).then(({ title, salary, departmentId }) => {
        const query = `INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${salary}, ${departmentId})`;
        return query;
    });
}

module.exports = getNewRole;