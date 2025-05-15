require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// MySQL Database Configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "12richa34",
  database: "ai_query_bot",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

async function createAdminUser() {
  console.log('==============================');
  console.log('  Create First Admin Account  ');
  console.log('==============================');
  
  try {
    // Create database connection
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to database...');
    
    // Check if any admin users already exist
    const [adminUsers] = await connection.execute('SELECT COUNT(*) as count FROM users WHERE is_admin = TRUE');
    
    if (adminUsers[0].count > 0) {
      console.log('Admin user already exists in the database.');
      console.log(`There are ${adminUsers[0].count} admin users.`);
      
      const shouldContinue = await askQuestion('Do you want to create another admin user anyway? (y/n): ');
      if (shouldContinue.toLowerCase() !== 'y') {
        console.log('Operation cancelled. Exiting...');
        await connection.end();
        rl.close();
        return;
      }
    }
    
    // Get admin user information
    const username = await askQuestion('Enter admin username: ');
    const email = await askQuestion('Enter admin email: ');
    const password = await askQuestion('Enter admin password: ');
    
    // Validate inputs
    if (!username || !email || !password) {
      console.error('All fields are required. Please try again.');
      await connection.end();
      rl.close();
      return;
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insert admin user
    const [result] = await connection.execute(
      'INSERT INTO users (username, email, password, is_admin) VALUES (?, ?, ?, TRUE)',
      [username, email, hashedPassword]
    );
    
    console.log(`\nSuccess! Admin user "${username}" created successfully.`);
    console.log('You can now log in at the admin login page: http://localhost:5001/admin-login');
    
    await connection.end();
    rl.close();
    
  } catch (error) {
    console.error('Error creating admin user:');
    
    if (error.code === 'ER_DUP_ENTRY') {
      console.error('Username or email already exists in the database.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Database access denied. Check your MySQL credentials in .env file.');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('Database "ai_query_bot" does not exist. Please create it first.');
    } else {
      console.error(error.message);
    }
    
    rl.close();
  }
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Run the script
createAdminUser(); 