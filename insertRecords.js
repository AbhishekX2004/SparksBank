import pg from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';
import { USER, HOST, DATABASE, PASSWORD, POSTGRES_PORT } from './config/keys.js';

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

// Function to insert image
const insertRecords = async (imagePath) => {
    try {
        // Connect to the database
        await db.connect();

        // Read the image file
        const imageData = readFileSync(imagePath);

        // Insert the image into the database
        // const query = 'INSERT INTO users (accountno, name, gender, phone, email, picture, balance) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        // const values = [18064,"Uday Raj Gupta", "M", 3546879210, "uday@gmail.com", imageData, 10000];
        
        // const query = 'UPDATE users SET picture = $1 WHERE accountno = $2'
        // const values = [imageData,18064]

        const res = await db.query(query, values);
        console.log(`Done`);
    } catch (err) {
        console.error('Error inserting image:', err);
    } finally {
        // Close the database connection
        await db.end();
    }
};

// Path to the image file
const imagePath = join("../Resources/People/", 'Uday_Small.jpeg');

// Insert the image
insertRecords(imagePath);
