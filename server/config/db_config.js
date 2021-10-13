const config = require('../env/env');

module.exports = {
    HOST: config.host,
    USER: config.username,
    PASSWORD: config.password,
    DB: config.dbName,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};