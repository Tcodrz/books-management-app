module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });

    return Book;
}