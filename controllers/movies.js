const { response } = require('express');
const Movie = require('../models/movie');

const moviesGet = async(req, res = response) => {
    const [total, movies] = await Promise.all([
        Movie.countDocuments(),
        Movie.find().sort({ release_date: -1 })
    ]);
                        
    res.json({
        total,
        movies
    })
}

const moviesPost = async(req, res = response) => {
    const {title, release_date, genre, plot} = req.body;
    const movie = new Movie({title, release_date, genre, plot});

    //verifico title
    const existsTitle = await Movie.findOne({title});
    if (existsTitle) {
        return res.status(400).json({
            msg: 'Title already exists'
        })
    }
    await movie.save();

    res.json({
        movie          
    })
}

const moviesPut = async(req, res = response) => {
    const {id} = req.params;
    const { title, ...resto } = req.body;

    const movie = await Movie.findByIdAndUpdate(id, resto);

    res.json({
        movie              
    })
}

const moviesDelete = async(req, res = response) => {
    const {id} = req.params;

    const movie = await Movie.findByIdAndUpdate(id, {status: false});

    res.json({
        movie         
    })
}

module.exports = {
    moviesGet,
    moviesPost,
    moviesPut,
    moviesDelete
}