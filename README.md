# AI Query Bot

An AI-powered query bot system with user authentication, chat history, and dynamic JSON data search.

## Features

- User authentication (login/signup)
- AI-powered chatbot using Google's Gemini AI
- Chat history storage in MySQL database
- Responsive UI with Bootstrap
- Dynamic JSON data search for FAQs and academic calendars
- API endpoints for accessing FAQ data programmatically
- Client-side utilities for working with FAQ data

## Prerequisites

- Node.js (v16 or higher)
- MySQL Server
- Google API Key for Gemini AI

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ai-query-bot
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   GOOGLE_API_KEY=your_google_api_key
   DB_HOST=localhost
   DB_USER=admin
   DB_PASSWORD=12richa34
   ```

4. Set up the database:
   ```
   node setup-database.js
   ```
   This script will guide you through creating the database and setting up the necessary permissions.

## Running the Application

1. Start the server:
   ```
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5001
   ```

## FAQ Data Search

The application includes functionality to search through JSON data files for FAQs and other structured information:

- **Calendar Demo**: Navigate to `/calendar-search.html` to try the academic calendar search
- **API Documentation**: See `API-DOCS.md` for details on the FAQ data search API endpoints
- **Client-Side Utilities**: Check out `/js/faq-utils.js` and `/js/academicCalendar.js` for utilities to work with FAQ data

## Adding Custom FAQ Data

To add your own FAQ data:

1. Create a JSON file with your data in the `public/faqdata` directory
2. Use the format that suits your data (can be array of objects or any valid JSON structure)
3. The system will automatically detect and make it available through the search API

Example:
```json
[
  { 
    "title": "My FAQ Data"
  },
  {
    "question": "What is the answer to life, the universe, and everything?",
    "answer": "42"
  },
  {
    "question": "What is your favorite color?",
    "answer": "Blue. No, yellow!"
  }
]
```

## Database Setup

If you encounter database connection issues, you can manually set up the database:

1. Log in to MySQL as root:
   ```
   mysql -u root -p
   ```

2. Create the database:
   ```sql
   CREATE DATABASE ai_query_bot;
   ```

3. Create the admin user:
   ```sql
   CREATE USER 'admin'@'localhost' IDENTIFIED BY '12richa34';
   ```

4. Grant privileges:
   ```sql
   GRANT ALL PRIVILEGES ON ai_query_bot.* TO 'admin'@'localhost';
   FLUSH PRIVILEGES;
   ```

5. Exit MySQL:
   ```sql
   exit;
   ```

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Make sure MySQL is running
2. Verify your MySQL credentials in the `.env` file
3. Run the setup script: `node setup-database.js`
4. Check that the user has the necessary permissions

### API Key Issues

If you encounter issues with the Gemini AI API:

1. Make sure your API key is correctly set in the `.env` file
2. Verify that your API key has access to the Gemini AI service
3. Check the console for specific error messages

## License

This project is licensed under the MIT License - see the LICENSE file for details. 