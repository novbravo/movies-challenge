const { response } = require('express');
const Rating = require('../models/rating');

const ratingsGet = async(req, res = response) => {
    const [total, ratings] = await Promise.all([
        Rating.countDocuments(),
        Rating.find()
            .populate('user')
            .populate('movie')
    ]);
                        
    res.json({
        total,
        ratings
    })
}

const ratingsGetByMovie = async(req, res = response) => {
    const { id } = req.params;
    const ratings = await Rating.find({'movie': id})
                                .populate('movie')
                                .populate('user');
    
    let avg = 0;                     
    if (ratings.length > 0) {
        let sum = 0;
        for( var i = 0; i < ratings.length; i++ ){
            sum += parseInt( ratings[i].rating, 10 );
        }

        avg = sum/ratings.length;
    }
    res.json({
        avg,
        ratings
    });
}


const ratingsPost = async(req, res = response) => {
    const { user, movie, comment, rating} = req.body;
    const ratingObj = new Rating({ user, movie, comment, rating });
    
    await ratingObj.save();

    res.json({
        ratingObj
    })
}

const ratingsPut = async(req, res = response) => {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const ratingObj = await Rating.findByIdAndUpdate(id, {rating, comment});

    res.json({
        ratingObj         
    })
}

// const ratingsDelete = async(req, res = response) => {
//     const {id} = req.params;

//     const Rating = await Rating.findByIdAndUpdate(id, {status: false});

//     res.json({
//         Rating         
//     })
// }

module.exports = {
    ratingsPost,
    ratingsGet,
    ratingsPut,
    ratingsGetByMovie
    // ratingsDelete
}