const db = require("../models/index");
const Book = db.books;
const Genre = db.genres;

/* Create a new book */
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).json({
      message: "All books must have titles",
    });
    return;
  }

  const book = {
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genres.join('|'),
    author: req.body.author,
  };

  Book.create(book)
    .then((data) => {
      res.status(200).json({
        data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

/* Get all books */
exports.findAll = async (req, res) => {
  try {
    const books = await Book.findAll();

    if (!books) {
      return res.status(401).json({
        message: "No books found",
      });
    }

    return res.status(200).json({
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* Get specific book */
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findOne({
      where: {
        id,
      },
    });

    return res.status(200).json({
      data: book,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Book not found",
    });
  }
};

/* Update one book */
exports.update = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!book) {
      return res.status(404).json({
        message: err.message,
      });
    }

    const updatedBook = await book.update({
      ...req.body,
      genre: req.body.genres.join('|')
    });

    if (!updatedBook) {
      return res.status(500).json({
        message: "Could not update",
      });
    }

    return res.status(200).json({
      data: updatedBook,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/* Delete a book */
exports.delete = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!book) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    const deletedItems = await Book.destroy({
      where: {
        id: book.id,
      },
    });
    if (!deletedItems) {
      return res.status(500).json({
        message: "Could not delete row",
      });
    }

    return res.status(200).json({
      data: {},
      message: "Item deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/* Populate DB with books from google books ../assets/MOCK_DATA.json */
exports.populateDB = async () => {

  const BOOKS = require('../assets/MOCK_DATA.json');
  const genres = [];

  BOOKS.forEach(async (book) => {
    const bookGenres = book.genre.split('|');

    if (bookGenres) {
      bookGenres.forEach(genre => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      })
    }

    book.genres = bookGenres;
    try {
      await Book.create(book);
    } catch (err) {
      console.error(err);
    }
  });

  genres.forEach(async (genre) => {
    try {
      await Genre.create({ name: genre });
    } catch (err) {
      console.error(err);
    }
  })

};
