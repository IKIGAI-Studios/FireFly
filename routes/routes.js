var route = require('express').Router();
var {user, product} = require('../connection');
var {uploadPhoto} = require('../middlewares/uploadPhoto');

// VIEWS

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

route.get('/login', (req, res) => {
    res.render('login');
});

// POST & GETS

// Login
route.post('/loginValidate', (req, res) => {
    user.findOne({
        where: {
            usr: req.body.user,
            password: req.body.password,
            active: true
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

// Shows

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
                res.send('There arent users');
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
            active: true
        }
    })
        .then((products) => {
            console.table(products.length);
            if (products.length != 0) {
                res.render('showProduct', {products});
            } else {
                res.send('There arent products');
            }
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.send(`Error ${e}`);
        });
});

// Inserts

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

route.post('/newProduct', uploadPhoto("product"), (req, res) => {
    req.body.photo = req.file.originalname;
    console.table(req.body);
    product.create(req.body)
        .then(() => {
            res.send('Producto guardado correctamente <br> <a href="registerProduct"> Regresar <a>');
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.send(`Error al guardar el Producto: ${e}`);
        })
});

// Updates

route.get('/editUser/:id_usr', (req, res) => {
    user.findOne({
        where: {
            id_usr: req.params.id_usr
        }
    })
        .then((usrM) => {
            if (usrM.length != 0) {
                res.render('editUser', {usrM});
            } else {
                res.send('No existe el usuario');
            }
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.send(`Error ${e}`);
        });
});

route.post('/updateUser', uploadPhoto("user"), (req, res) => {
    req.body.photo = req.body.usr + '-' + req.file.originalname;
    console.table(req.body);
    user.update(req.body, {
        where: {
            id_usr: req.body.id_usr
        }
    })
        .then(() => {
            user.findOne({
                where: {
                    usr: req.body.usr,
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
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.send(`Error al actualizar el Usuario: ${e}`);
        })
});

route.get('/editProduct/:id_prod', (req, res) => {
    product.findOne({
        where: {
            id_prod: req.params.id_prod
        }
    })
        .then((prod) => {
            console.table(prod.length);
            if (prod.length != 0) {
                res.render('editProduct', {prod});
            } else {
                res.send('No existe el producto');
            }
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.send(`Error ${e}`);
        });
});

route.post('/updateProduct', uploadPhoto("product"), (req, res) => {
    req.body.photo = req.file.originalname;
    console.table(req.body);
    product.update(req.body, {
        where: {
            id_prod: req.body.id_prod
        }
    })
        .then(() => {
            res.render('showProduct');
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.send(`Error al actualizar el Producto: ${e}`);
        })
});

// Deletes

route.get('/deletePhysicalUser/:id', (req,res) => {
    user.destroy({
        where: {
            id_usr: req.params.id
        }
    })
        .then(() => {
            res.redirect('/showUsers');
        })
        .catch((e) => {
            res.send(`Error ${e}`)
        });
});

route.get('/deletePhysicalProduct/:id', (req,res) => {
    product.destroy({
        where: {
            id_prod: req.params.id
        }
    })
        .then(() => {
            res.redirect('/showProducts');
        })
        .catch((e) => {
            res.send(`Error ${e}`)
        });
});

route.get('/deleteLogicalUser/:id_usr', (req, res) => {
    user.update(
    {
        active: false 
    }, 
    {
        where: {
            id_usr: req.params.id_usr
        }
    })
        .then(() => {
            res.redirect('/showUsers');
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.send(`Error al actualizar el Usuario: ${e}`);
        })
});

route.get('/deleteLogicalProduct/:id_prod', (req, res) => {
    product.update(
    {
        active: false 
    }, 
    {
        where: {
            id_prod: req.params.id_prod
        }
    })
        .then(() => {
            res.redirect('/showProducts');
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.send(`Error al actualizar el Usuario: ${e}`);
        })
});

module.exports = route;