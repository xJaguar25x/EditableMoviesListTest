const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MovieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    directors_name: {
        type: String
    },
    duration: {
        type: String
    },
    rating: {
        type: String
    },
    released_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Movie = mongoose.model('movie', MovieSchema);
