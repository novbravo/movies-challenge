const { response, request } = require('express');

const usersGet = (req = request, res = response) => {
    const { q, nombre = 'No name', apiKey, page = 1, limit } = req.query;
    res.json({
        msg: 'get api - controller',
        q,
        nombre,
        apiKey,
        page,
        limit
    })
}

const usersPost = (req, res = response) => {
    const {nombre, id} = req.body;
    res.json({
        id,
        nombre,
        msg: 'post api - controller'                
    })
}

const usersPut = (req, res = response) => {
    const { id } = req.params;
    res.json({        
        msg: 'put api - controller',
        id
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete api - controller'                
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}