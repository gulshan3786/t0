// db.mjs

import mysql from 'mysql2';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MySQL database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'db_26',
};

// Create a MySQL connection pool
const db = mysql.createPool(dbConfig);

// Set the correct path for views directory
const viewsDirectory = join(__dirname, 'views');

// Connect to the database
db.getConnection((err, connection) => {
  if (err) {
    console.error('Could not connect to the database:', err);
  } else {
    console.log('Connected to the database successfully');
    // Release the connection back to the pool
    connection.release();
  }
});

export { db, viewsDirectory };
