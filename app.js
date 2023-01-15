// Call in installed dependencies
const express = require('express');
// set up express app
const app = express();
// set up port number
const port = 3000;
const bodyParser= require('body-parser');
const mongoose = require('mongoose')
const csv = require("./controller");

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> {
        console.log('Database connected');
    })
    .catch((error)=> {
        console.log(error)
        console.log('Error connecting to database');
    });
// set up home route
app.get('/', (request, respond) => {
    respond.status(200).json({
        message: 'Welcome to Project Support',
    });
});
app.get('/csv', csv)
app.listen(port, (request, respond) => {
    console.log(`Our server is live on ${port}. Yay!`);
});