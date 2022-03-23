const { Router } = require('express');
const { check } = require('express-validator');
const { ValidarCampos, EmailExists, ExistsUserById } = require('../middlewares/validate-fields');

const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users');
const router = Router();

router.get('/', usersGet)

router.put('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(ExistsUserById),
    ValidarCampos
], usersPut)

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    ValidarCampos
], usersPost)

router.delete('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(ExistsUserById),
    ValidarCampos
], usersDelete)

module.exports = router;