const express = require('express');
const router = express.Router();

// Movie Model
const Movie = require('../../models/Movie');

// @route   GET api/movies
// @desc    Get All Movies
// @access  Public
router.get('/', (req, res) => {
    Movie.find()
      .sort({ date: -1 })
      .then(movies => res.json(movies));
});

// @route   POST api/movies
// @desc    Create A Movie
// @access  Public
router.post('/', (req, res) => {
    const newMovie = new Movie({
        name: req.body.name,
        directors_name: req.body.directors_name,
        duration: req.body.duration,
        rating: req.body.rating,
        released_date: req.body.released_date
    });

    newMovie.save().then(item => res.json(item));
});

// @route   DELETE api/movies/:id
// @desc    Delete A Movie
// @access  Public
router.delete('/:id', (req, res) => {
    Movie.findById(req.params.id)
      .then(item => item.remove().then(() => res.status(200).json({msg:"delete success"})))
      .catch(err => res.status(404).json({ success: false, msg: err }));
});

module.exports = router;