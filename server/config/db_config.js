module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'Tomas@42910!',
    DB: 'booksdb',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};