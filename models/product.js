let sequelize = require('sequelize');

module.exports = (conexion) => {
    var productSchema = conexion.define('product', {
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
            type: sequelize.BOOLEAN
        },
        active: {
            type: sequelize.STRING
        }
    });
    return productSchema;
}