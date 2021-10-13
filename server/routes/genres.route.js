const router = require('express').Router();
const genres = require('../controllers/genre.controller');


router.get('/', genres.findAll);

router.post('/', genres.create);

module.exports = router;
