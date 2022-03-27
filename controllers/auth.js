const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJwt } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        // existe email
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                msg: 'User/password is not valid',
                success: false
            })
        }

        // está activo
        if (!user.status) {
            return res.json({
                msg: 'User/password is not valid',
                success: false
            })
        }
        
        // verificar password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.json({
                msg: 'User/password is not valid',
                success: false
            })
        }
        // generar jwt
        const token = await generateJwt(user._id);

        res.json({
            token,
            user,
            success: true
        })    
    } catch (error) {
        return res.status(500).json({
            msg: 'Error. ' + error,
            success: false
        })
    }
}

module.exports = {
    login
}