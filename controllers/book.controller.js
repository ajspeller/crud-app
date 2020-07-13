// models
const Book = require('../models/Book.model');

exports.books = {
  get_all: (req, res, next) => {
    Book.find({})
      .select('-__v')
      .exec((err, result) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        return res.status(200).json({
          count: result.length,
          books: result.map((book) => {
            return {
              ...book._doc,
              request: {
                type: 'GET',
                url: `http://localhost:8080/books/${book._id}`,
              },
            };
          }),
        });
      });
  },
  get_by_id: (req, res, next) => {
    const { bookId } = req.params;
    if (!bookId) {
      return res.status(400).json({
        error: 'A bookId is required',
      });
    }
    Book.findById(bookId)
      .select('-__v')
      .exec((err, book) => {
        if (book) {
          return res.status(200).json({
            book,
            request: {
              type: 'GET',
              url: `http://localhost:8080/books`,
            },
          });
        }
        return res.status(500).json({
          error: err,
        });
      });
  },
  remove: (req, res, next) => {
    const { bookId } = req.params;
    Book.deleteOne({
      _id: bookId,
    }).exec((err, book) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      return res.status(204);
    });
  },
  update: (req, res, next) => {
    const { bookId } = req.params;
    const { title, author, category } = req.body;
    Book.findOneAndUpdate(
      { _id: bookId },
      { $set: { title } },
      { upsert: true },
      (err, newBook) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        return res.status(200).json(newBook);
      }
    );
  },
  create: (req, res, next) => {
    const { title, author, category } = req.body;
    const book = new Book({
      title,
      author,
      category,
    });

    book
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
};
