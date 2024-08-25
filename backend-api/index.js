const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// GET route
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// POST route
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid data format' });
    }

    const numbers = data.filter(item => !isNaN(item) && item !== '');
    const alphabets = data.filter(item => isNaN(item) && item !== '');

    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

    const response = {
        is_success: true,
        user_id: 'john_doe_17091999', // Replace with your actual user ID
        email: 'john@xyz.com', // Replace with your actual email
        roll_number: 'ABCD123', // Replace with your actual roll number
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    };

    res.json(response);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:3001`);
});
