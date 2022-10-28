let sequelize = require('sequelize');

module.exports = (conexion) => {
    var userSchema = conexion.define('user', {
        id: {
            type: sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        usr: {
            type: sequelize.STRING
        }, 
        name: {
            type: sequelize.STRING
        },
        email: {
            type: sequelize.STRING
        },
        password: {
            type: sequelize.STRING
        },
        photo: {
            type: sequelize.STRING
        }
    });
    return userSchema;
}