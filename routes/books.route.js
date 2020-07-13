const express = require('express');
const router = express.Router();

// controllers
const { books: booksController } = require('../controllers/book.controller');

// api
router.get('/', booksController.get_all);

router.get('/:bookId', booksController.get_by_id);

router.delete(':bookId', booksController.remove);

router.put(':bookId', booksController.update);

router.post('/', booksController.create);

module.exports = router;
