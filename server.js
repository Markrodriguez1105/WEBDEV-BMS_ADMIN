const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'household',
};

// Function to get a database connection
const getConnection = () => {
  return mysql.createConnection(dbConfig);
};

// API endpoint to test database connection
app.get('/api/test-connection', (req, res) => {
  const connection = getConnection();
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err.message);
      return res.status(500).json({ error: 'Database connection failed' });
    }
    res.json({ message: 'Successfully connected to the database' });
    connection.end();
  });
});

// API endpoint to fetch data from the database
app.get('/api/data', async (req, res) => {
  try {
    const data = await query('SELECT * FROM generalcensus');
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from database:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from the database' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
