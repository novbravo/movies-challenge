const { Schema, model } = require('mongoose');
const RatingSchema = new Schema({
    rating: {
        type: Number,
        required: [true, 'Rating is not empty']
    },
    comment: {
        type: String,
    },
    user: { 
        type: Schema.Types.ObjectId, ref: 'User'
    },
    movie: { 
        type: Schema.Types.ObjectId, ref: 'Movie' 
    }
});

RatingSchema.methods.toJSON = function() {
    let rating = this;
    let ratingObject = rating.toObject();

    return ratingObject;
}

module.exports = model('Rating', RatingSchema);