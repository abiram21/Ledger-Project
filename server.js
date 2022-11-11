global.express = require('express')
const http  = require('http');
const dotenv = require('dotenv');

var app = express();
dotenv.config();

const port = process.env.PORT||3000;

global.util = require('./utils/functions');
const server = http.Server(app);
require('./app')(app);
server.listen(port, () => {
    console.log("Server started on port: " + port);
});