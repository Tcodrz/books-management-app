const db = require("../models/index");
const axios = require("axios").default;
const Book = db.books;
const Genre = db.genres;
const Op = db.Sequelize.Op;

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
    genre: req.body.genre,
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

    const updatedBook = await book.update(req.body);

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

/* Populate DB with books from google books api */
exports.populateDB = async () => {
  var options = {
    method: "GET",
    url: "https://google-books.p.rapidapi.com/volumes",
    params: { key: require("../env/env").apiKey },
    headers: {
      "x-rapidapi-host": "google-books.p.rapidapi.com",
      "x-rapidapi-key": "b96370f5e1msh3989e92b5612b99p118463jsnd26d5771f365",
    },
  };

  axios.request(options).then(function (response) {
    const genres = [];
    response.data.items.forEach(async (item) => {
      const newBook = {
        title: item.volumeInfo.title,
        description: item.volumeInfo.description,
        author: item.volumeInfo.authors?.length ? item.volumeInfo.authors[0] : "",
        genre: item.volumeInfo.categories?.length ? item.volumeInfo.categories[0] : "",
        image: item.volumeInfo.imageLinks.thumbnail
      };

      try {
        const book = await Book.create(newBook);
        if (book.genre && !genres.includes(book.genre)) {
          genres.push(book.genre);
          const genre = await Genre.create({ name: book.genre });
        }
      } catch (err) {
        console.error(err);
      }
    });
  })
    .catch((error) => {
      console.error(error);
    });
};
