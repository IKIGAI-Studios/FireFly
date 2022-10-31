var sequelize = require('sequelize');
var userModel = require('./models/user');
var productModel = require('./models/product');
                                //DB, User, Pass, obj
var connection = new sequelize('tanukitchen', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306'
})

connection.sync({force:false})
    .then(() => {
        console.info(`Connect to MySQL`);
    })
    .catch((e) => {
        console.error(`Error: ${e}`);
    });

var user = userModel(connection);
var product = productModel(connection);

module.exports = {
    user,
    product
};