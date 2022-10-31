var route = require('express').Router();
var {user, product} = require('../connection');
var {uploadPhoto} = require('../middlewares/uploadPhoto');

//Views

route.get('/', (req, res) => {
    res.render('index');
});

route.get('/home', (req, res) => {
    res.render('index');
});

route.get('/registerUser', (req, res) => {
    res.render('registerUser');
});

route.get('/registerProduct', (req, res) => {
    res.render('registerProduct');
});

//Posts & Gets

route.post('/login', (req, res) => {
    user.findOne({
        where: {
            usr: req.body.user,
            password: req.body.password
        }
    })
        .then((usr) => {
            console.table(usr.length);
            if (usr.length != 0) {
                res.render('profile', {usr});
            } else {
                res.send('Datos erroneos <br> <a href="login"> Regresar <a>');
            }
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.send(`Error ${e}`);
        });
});

route.get('/showUsers', (req, res) => {
    user.findAll({
        where: {
            active: true
        }
    })
        .then((users) => {
            console.table(users.length);
            if (users.length != 0) {
                res.render('showUser', {users});
            } else {
                res.send('User doesn´t exist');
            }
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.send(`Error ${e}`);
        });
});

route.get('/showProducts', (req, res) => {
    product.findAll({
        where: {
            active: "true"
        }
    })
        .then((products) => {
            console.table(products.length);
            if (products.length != 0) {
                res.render('showProduct', {products});
            } else {
                res.send('No existen Productos');
            }
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.send(`Error ${e}`);
        });
});

route.post('/newUser', uploadPhoto("user"), (req, res) => {
    req.body.photo = req.body.usr + '-' + req.file.originalname;
    console.table(req.body);
    user.create(req.body)
        .then(() => {
            res.send('Usuario guardado correctamente <br> <a href="registerUser"> Regresar <a>');
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.send(`Error al guardar el Usuario: ${e}`);
        })
});

module.exports = route;