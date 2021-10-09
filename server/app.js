const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./models/index');
const axios = require('axios')``;
const Book = db.books;

const booksRoutes = require('./routes/books.route');

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

db.sequelize.sync({ force: true }).then(() => {
    console.log('DB dropped and synced');
}).catch(error => console.error);

app.use('/api/books', booksRoutes);



app.get(('/'), (req, res) => {
    res.json({ message: `welcome to my awesome express server!` });
});

const PORT = process.env.port || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});