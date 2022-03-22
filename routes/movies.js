const { Router } = require('express');
const { check } = require('express-validator');

const { ValidarCampos, MovieExists, ExistsMovieById } = require('../middlewares/validate-fields');

const { moviesGet, movieGet, moviesPost, moviesPut, moviesDelete } = require('../controllers/movies');

const router = Router();

router.get('/', moviesGet)

router.get('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(ExistsMovieById),
    ValidarCampos
], movieGet)

router.put('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(ExistsMovieById),
    ValidarCampos
], moviesPut)

router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    check('release_date', 'Release date is required').not().isEmpty(),
    check('genre', 'Genre is required').not().isEmpty(),
    check('title').custom(MovieExists),
    ValidarCampos
], moviesPost)

router.delete('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(ExistsMovieById),
    ValidarCampos
], moviesDelete)

module.exports = router;