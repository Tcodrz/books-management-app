const router = require('express').Router();
const books = require('../controllers/book.controller');

router.get('/', books.findAll);

router.post('/', books.create);

module.exports = router;
