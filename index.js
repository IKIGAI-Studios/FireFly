var express = require('express');
var session = require('express-session');
var passport = require('passport');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var {Connection} = require('./utils/connection');
var path = require('path');
var cors = require('cors');
const routes = require('./routes/routes');
const routesG = require('./routes/googleRoutes');
const apiRoutes = require('./routes/api_routes');

require('dotenv').config();
const app = express();

app.use('/web', express.static(path.join(__dirname, '/web')));
app.use(cors());

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

var myStore = new SequelizeStore({
    db: Connection
});

app.use(session({
    secret: process.env.SECRETSESSION,
    resave: false,
    saveUninitialized: true,
    store: myStore,
    cookie: {
        maxAge: 1000*60*24
    }
}));

myStore.sync();

app.use(passport.initialize());
app.use(passport.session());

require('./utils/passport');
require('./utils/googlePassport');

app.use('/', routes);
app.use('/gAuth', routesG);
app.use('/api', apiRoutes);

var PORT = process.env.PORT;;

app.listen(PORT, () => {
    console.info(`Servidor activo en el puerto ${PORT}`);
});