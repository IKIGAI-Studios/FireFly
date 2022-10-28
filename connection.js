var sequelize = require('sequelize');
var userModel = require('./models/user');
                                //DB, User, Pass, obj
var connection = new sequelize('marketplace', 'root', 'root', {
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

module.exports = {
    user
};