const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = 8081;

// Middleware to parse JSON request bodies
app.use(express.json());

// MongoDB Atlas connection string
// Replace <username>, <password>, and <cluster-url> with your MongoDB Atlas credentials
const MONGO_URI = 'mongodb+srv://luunguyenminhtriet021025_db_user:felixdamagic021025%21@cluster0.nlznexw.mongodb.net/lab4_users_database?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

// POST /users - Insert a new user document with validation
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ status: false, message: messages });
        }
        // Handle duplicate email (MongoDB unique index error code 11000)
        if (error.code === 11000) {
            return res.status(400).json({ status: false, message: 'Email already exists' });
        }
        res.status(500).json({ status: false, message: 'Server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
