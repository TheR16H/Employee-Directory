const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect();

// Execute SQL Statements for Stored Procedures
const executeStoredProcedures = async () => {
  try {
    await client.query('BEGIN;'); // Start a transaction
    await client.query(`
      INSERT INTO department (name) 
      VALUES ('Marketing'), ('Sales'), ('Human Resources'), ('VP');
    `);
    await client.query(`
      INSERT INTO role (title, salary, department_id)
      VALUES ('VP Branding', 9000000, 1), ('Director of Advertising', 7500000, 2),
             ('Intern', 50000, 3), ('Internship', 50001, 3), ('Social media assistant', 60000, 4);
    `);
    await client.query(`
      INSERT INTO employees (first_name, last_name, role_id, manager_id) 
      VALUES ('Jess', 'Bowen', 3, NULL), ('Robert', 'Dawson', 4, NULL),
             ('Syxx', 'Singer', 1, 1), ('Jewel', 'Reyes', 2, 2), ('Tom', 'Fletcher', 5, NULL);
    `);
    await client.query('COMMIT;'); // Commit the transaction
    console.log('Stored Procedures executed successfully.');
  } catch (error) {
    await client.query('ROLLBACK;'); // Roll back the transaction in case of error
    console.error('Error executing Stored Procedures:', error);
  } finally {
    client.end();
  }
};

executeStoredProcedures();