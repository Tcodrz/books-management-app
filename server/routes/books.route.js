const router = require('express').Router();
const books = require('../controllers/book.controller');


router.get('/', books.findAll);

router.get('/:id', books.findOne);

router.post('/', books.create);

router.post('/:id', books.update);

router.delete('/:id', books.delete);

module.exports = router;
