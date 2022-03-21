const { Schema, model } = require('mongoose');
const MovieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    release_date: {
        type: Date,
        required: [true, 'Release date is required']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    plot: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Movie', MovieSchema);