'use strict';
const express = require('express');
const router = require('./src/routes/routes.js')
const bodyParser = require('body-parser');


// App instance 
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)


// Constants
// const PORT = 8080;
const PORT = 8090;
const HOST = '0.0.0.0';

//Listening
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);

});











