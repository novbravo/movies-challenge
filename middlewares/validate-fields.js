const { validationResult } = require('express-validator');
const Movie = require('../models/movie');
const User = require('../models/user');
const Rating = require('../models/rating');

const ValidarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: errors.errors[0].msg,
            success: false
        });
    }
    next();
}

const EmailExists = async( email = '') => {
    const exist = await User.findOne({email});
    if(exist) {
        throw new Error(`Email ${ email } already exists` );
    }
}

const ExistsUserById = async( id ) => {
    const existUser = await User.findById(id);
    if(!existUser) {
        throw new Error(`User ID ${ id } not exists` );
    }
}

const MovieExists = async( title = '') => {
    const exist = await Movie.findOne({title});
    if(exist) {
        throw new Error(`Title ${ title } already exists` );
    }
}

const ExistsMovieById = async( id ) => {
    const existMovie = await Movie.findById(id);
    if(!existMovie) {
        throw new Error(`Movie ID ${ id } not exists` );
    }
}

const ExistsRatingById = async( id ) => {
    const existRating = await Rating.findById(id);
    if(!existRating) {
        throw new Error(`Rating ID ${ id } not exists` );
    }
}

module.exports = {
    ValidarCampos,
    EmailExists, ExistsUserById,
    MovieExists, ExistsMovieById,
    ExistsRatingById
}