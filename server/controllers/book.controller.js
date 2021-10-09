const db = require('../models/index');
const Book = db.books;
const Op = db.Sequelize.Op;


/* Create a new book */
exports.create = (req, res) => {

    if (!req.body.title) {
        res.status(400).json({
            message: 'All books must have titles'
        });
        return;
    }

    const book = {
        title: req.body.title,
        description: req.body.description
    };

    Book.create(book)
        .then((data) => {
            res.status(200).json({
                data
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });

};

/* Get all books */
exports.findAll = async (req, res) => {
    try {
        const books = await Book.findAll();

        if (!books) {
            return res.status(401).json({
                message: 'No books found'
            });
        }

        return res.status(200).json({
            data: books
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};

/* Get specific book */
exports.findOne = (req, res) => {

};

/* Get books by Genres */
exports.findByGenres = (req, res) => {

}

/* Update one book */
exports.update = (req, res) => {

};

/* Delete a book */
exports.delete = (req, res) => {

};
