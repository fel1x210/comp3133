const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
const DB_CONNECTION_STRING = 'mongodb+srv://luunguyenminhtriet021025_db_user:felixdamagic021025!@cluster0.hgyuo2r.mongodb.net/restaurants?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Route 1: Get all restaurants (all columns)
app.get('/restaurants', async (req, res) => {
    try {
        const { sortBy } = req.query;
        
        // If sortBy parameter exists, handle sorting
        if (sortBy) {
            const sortOrder = sortBy.toUpperCase() === 'ASC' ? 1 : -1;
            const restaurants = await Restaurant.find({})
                .select('_id cuisine name city restaurant_id')
                .sort({ restaurant_id: sortOrder });
            
            return res.json(restaurants);
        }
        
        // Default: return all restaurants with all columns
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 2: Get restaurants by cuisine
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    try {
        const { cuisine } = req.params;
        const restaurants = await Restaurant.find({ cuisine: cuisine });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 3: Get Delicatessen restaurants not in Brooklyn
app.get('/restaurants/Delicatessen', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({
            cuisine: 'Delicatessen',
            city: { $ne: 'Brooklyn' }
        })
        .select('cuisine name city -_id') 
        .sort({ name: 1 }); 
        
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
