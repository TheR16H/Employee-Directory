const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
         user: process.env.DB_USER,
         host: process.env.DB_HOST,
         database: process.env.DB_NAME,
         password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
//   port: 3001,
});

client.connect();

// Call Stored Procedures
const callStoredProcedures = async () => {
  try {
    await client.query('CALL SeedDepartments();');
    await client.query('CALL SeedRoles();');
    await client.query('CALL SeedEmployees();');
    console.log('Stored Procedures executed successfully.');
  } catch (error) {
    console.error('Error executing Stored Procedures:', error);
  } finally {
    client.end();
  }
};

callStoredProcedures();