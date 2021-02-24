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
        type: Number
    },
    rating: {
        type: Number
    },
    released_date: {
        type: Number,
        default: new Date().getFullYear()
    }
});

module.exports = Movie = mongoose.model('movie', MovieSchema);
