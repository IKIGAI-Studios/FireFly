var express = require('express');
var path = require('path');
var cors = require('cors');
const routes = require('./routes/routes');
const apiRoutes = require('./routes/api_routes');

var app = express();
app.use('/web', express.static(path.join(__dirname, '/web')));
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use('/', routes);
app.use('/api', apiRoutes);

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server on ${port}`);
});