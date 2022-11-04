const route = require('express').Router();
const {user} = require('../connection');
const {uploadPhoto} = require('../middlewares/uploadPhoto');

route.get('/showUsers', (req, res) => {
    user.findAll({
        where: {
            active: true
        }
    })
        .then((users) => {
            res.json(users);
        })
        .catch((e) => {
            res.json(`Error ${e}`);
        });
});

route.get('/showProducts', (req, res) => {
    product.findAll({
        where: {
            active: true
        }
    })
        .then((products) => {
            res.render(products);
        })
        .catch((e) => {
            res.json(`Error ${e}`);
        });
});

// Inserts

route.post('/newUser', (req, res) => {
    user.create(req.body)
        .then(() => {
            res.json('Guardado exitosamente');
        })
        .catch((e) => {
            res.json(`Error al guardar el Usuario: ${e}`);
        })
});

route.post('/newProduct', (req, res) => {
    product.create(req.body)
        .then(() => {
            res.json('Guardado exitosamente');
        })
        .catch((e) => {
            res.json(`Error al guardar el Producto: ${e}`);
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
                res.json(usrM);
            } else {
                res.json('No existe el usuario');
            }
        })
        .catch((e) => {
            res.json(`Error ${e}`);
        });
});

route.post('/updateUser', (req, res) => {
    user.update(req.body, {
        where: {
            id_usr: req.body.id_usr
        }
    })
        .then(() => {
            res.json('Usuario modificado');
        })
        .catch((e) => {
            res.json(`Error al actualizar el Usuario: ${e}`);
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
                res.json(prod);
            } else {
                res.json('No existe el producto');
            }
        })
        .catch((e) => {
            res.json(`Error ${e}`);
        });
});

route.post('/updateProduct', (req, res) => {
    product.update(req.body, {
        where: {
            id_prod: req.body.id_prod
        }
    })
        .then(() => {
            res.json('Producto editado');
        })
        .catch((e) => {
            res.json(`Error al actualizar el Producto: ${e}`);
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
            res.json('Usuario eliminado');
        })
        .catch((e) => {
            res.json(`Error ${e}`)
        });
});

route.get('/deletePhysicalProduct/:id', (req,res) => {
    product.destroy({
        where: {
            id_prod: req.params.id
        }
    })
        .then(() => {
            res.json('Usuario eliminado');
        })
        .catch((e) => {
            res.json(`Error ${e}`)
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
            res.json('Usuario eliminado');
        })
        .catch((e) => {
            res.json(`Error al eliminar el producto: ${e}`);
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
            res.json('Producto eliminado');
        })
        .catch((e) => {
            res.json(`Error al eliminar el producto: ${e}`);
        })
});

module.exports = route;