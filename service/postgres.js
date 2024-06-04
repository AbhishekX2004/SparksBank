import pg from 'pg';
import { USER, HOST, DATABASE, PASSWORD, POSTGRES_PORT } from '../config/keys.js';

// Create a new PostgreSQL client
const db = new pg.Client({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: POSTGRES_PORT,
  ssl: {
    rejectUnauthorized: false // Ignore SSL certificate validation (for Render)
  }
});

// Function to connect to the database
const connectToDatabase = async () => {
  try {
    await db.connect();
    console.log(`DATABASE:${DATABASE} connection status :: SUCCESSFUL`);
  } catch (error) {
    console.error(`DATABASE:${DATABASE} connection status :: FAILED\n${error}`);
  }
};

// Function to execute a query
const runQuery = async (query) => {
  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    return null;
  }
};

// Function to execute a query with value
const runQueryValue = async (query,value) => {
  try {
    const result = await db.query(query, value);
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    return null;
  }
};


// Export functions to connect and execute queries
export { connectToDatabase, runQuery, runQueryValue };
