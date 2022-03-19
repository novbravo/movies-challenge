const { response } = require('express');

const moviesGet = (req, res = response) => {
    res.json({
        msg: 'get api - controller'                
    })
}

const moviesPost = (req, res = response) => {
    res.json({
        msg: 'post api - controller'                
    })
}

const moviesPut = (req, res = response) => {
    res.json({
        msg: 'put api - controller'                
    })
}

const moviesDelete = (req, res = response) => {
    res.json({
        msg: 'delete api - controller'                
    })
}

module.exports = {
    moviesGet,
    moviesPost,
    moviesPut,
    moviesDelete
}