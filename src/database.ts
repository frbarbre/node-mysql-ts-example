import mysql from "mysql2/promise"; // using mysql2 - installed npm library

// using the variables from the .env file
// and creates the connection to database
const db = await mysql.createConnection({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  user: process.env.DB_USER!,
  database: process.env.DB_NAME!,
  password: process.env.DB_PASSWORD!,
  multipleStatements: true,
});

// exports database connection
export default db;
