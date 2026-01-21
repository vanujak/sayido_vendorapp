const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL is not defined.');
    console.error('Please create a .env file in the backend directory with your connection string.');
    process.exit(1);
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test DB Connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log('Connected to Database at:', result.rows[0]);
    });
});

// Routes
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if vendor exists
        const result = await pool.query('SELECT * FROM vendor WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const vendor = result.rows[0];

        // Check password
        // Supporting both bcrypt hash and plain text (as seen in the provided image for one user)
        let isMatch = false;
        if (vendor.password.startsWith('$2a$') || vendor.password.startsWith('$2b$') || vendor.password.startsWith('$2y$')) {
            isMatch = await bcrypt.compare(password, vendor.password);
        } else {
            // Fallback for plain text legacy passwords
            isMatch = vendor.password === password;
        }

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Success
        res.json({
            message: 'Login successful',
            user: {
                id: vendor.id,
                fname: vendor.fname,
                lname: vendor.lname,
                email: vendor.email,
                location: vendor.location
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// ...existing code...

app.post('/api/register', async (req, res) => {
    const { fname, lname, email, password, location } = req.body;

    if (!fname || !lname || !email || !password || !location) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const userExists = await pool.query('SELECT * FROM vendor WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const result = await pool.query(
            'INSERT INTO vendor (fname, lname, email, password, location) VALUES ($1, $2, $3, $4, $5) RETURNING id, fname, lname, email, location',
            [fname, lname, email, hashedPassword, location]
        );

        res.status(201).json({
            message: 'User registered successfully',
            user: result.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// ...existing code...