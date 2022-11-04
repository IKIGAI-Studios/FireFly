let sequelize = require('sequelize');

module.exports = (connection) => {
    var userSchema = connection.define('user', {
        id_usr: {
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
        },
        active: {
            type: sequelize.BOOLEAN
        },
        type: {
            type: sequelize.STRING
        }
    });
    return userSchema;
}