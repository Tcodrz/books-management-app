const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const booksRoutes = require('./routes/books.route');
const genreRoutes = require('./routes/genres.route');
const booksController = require('./controllers/book.controller');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(morgan('dev'));

/* DATABASE INTIALIZATION */
const mysql = require('mysql2/promise');
const db = require('./models/index');
const config = require('./env/env');

async function dbInit() {
    try {
        const connection = await mysql.createConnection({
            host: config.host,
            port: config.port,
            user: config.username,
            password: config.password
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.dbName}\`;`);
        await db.sequelize.sync({ force: true });
        booksController.populateDB();
    } catch (err) {
        console.error(err);
    }
}

dbInit()
    .then(() => {
        console.log('DB synced successfuly');
    })
    .catch(error => console.error(error));


app.use('/api/books', booksRoutes);
app.use('/api/genres', genreRoutes);


/* Don't Change This
    The Client is configured to use this port
*/
const PORT = process.env.port || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});