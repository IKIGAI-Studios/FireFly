let sequelize = require('sequelize');

module.exports = (connection) => {
    var productSchema = connection.define('product', {
        id_prod: {
            type: sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: sequelize.STRING
        }, 
        description: {
            type: sequelize.STRING
        },
        category: {
            type: sequelize.STRING
        },
        price: {
            type: sequelize.STRING
        },
        photo: {
            type: sequelize.STRING
        },
        active: {
            type: sequelize.BOOLEAN
        }
    });
    return productSchema;
}