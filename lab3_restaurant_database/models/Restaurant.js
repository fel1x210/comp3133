const mongoose = require('mongoose');

// Define the Restaurant Schema
const restaurantSchema = new mongoose.Schema({
    restaurant_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    address: {
        building: String,
        coord: [Number],
        street: String,
        zipcode: String
    },
    borough: String,
    city: {
        type: String,
        required: true
    },
    grades: [{
        date: Date,
        grade: String,
        score: Number
    }]
}, {
    collection: 'restaurants' // Specify the collection name
});

// Create and export the model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
