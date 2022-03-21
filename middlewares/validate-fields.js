const { validationResult } = require('express-validator');
const User = require('../models/user');

const ValidarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors
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

module.exports = {
    ValidarCampos, EmailExists, ExistsUserById
}