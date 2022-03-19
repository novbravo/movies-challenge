const { Router } = require('express');
const { moviesGet, moviesPost, moviesPut, moviesDelete } = require('../controllers/movies');
const router = Router();

router.get('/', moviesGet)

router.put('/', moviesPut)

router.post('/', moviesPost)

router.delete('/', moviesDelete)

module.exports = router;