const db = require('../models/index');
const Genre = db.genres;


exports.create = (req, res) => {
    console.log(req.body);
}

exports.findAll = (req, res) => {
    Genre.findAll().then((genres) => {
        if (!genres) {
            console.log('NO GENRES FOUND');
            return res.status(404).json({
                message: 'Not Found'
            });
        }
        return res.status(200).json({
            data: genres
        });

    });
}