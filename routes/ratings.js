const { Router } = require('express');
const { check } = require('express-validator');

const { ExistsRatingById, ValidarCampos } = require('../middlewares/validate-fields');

const { ratingsPost, ratingsGet, ratingsPut, ratingsGetByMovie, ratingsGetByRating } = require('../controllers/ratings');

const router = Router();

router.get('/', ratingsGet)

router.get('/:id', ratingsGetByMovie)

router.get('/ratings', ratingsGetByRating)

router.put('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(ExistsRatingById),
    check('rating', 'Rating is required').not().isEmpty(),
    check('rating', 'Rating must be number'),
    ValidarCampos
], ratingsPut)

router.post('/', [
    check('rating', 'Rating is required').not().isEmpty(),
    ValidarCampos
], ratingsPost)

router.delete('/', )

module.exports = router;