const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req = request, res = response) => {
    const query = { status: true };
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
    ]);
                        
    res.json({
        total,
        users
    })
}

const usersPost = async(req, res = response) => {   

    const {name, password, email} = req.body;
    const user = new User({name, password, email});

    //verifico email
    const existsEmail = await User.findOne({email});
    if (existsEmail) {
        return res.status(400).json({
            msg: `Email ${ email } already exists`,//'Email already exists'
            success: false
        })
    }

    // encrypt
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.json({
        user,
        success: true 
    })
}

const usersPut = async(req, res = response) => {
    const { id } = req.params;
    const { password, email, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        user
    })
}

const usersDelete = async(req, res = response) => {
    const {id} = req.params;

    const user = await User.findByIdAndUpdate(id, {status: false});

    res.json({
        user         
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}