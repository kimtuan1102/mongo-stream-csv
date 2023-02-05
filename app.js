// Call in installed dependencies
const express = require('express');
// set up express app
const app = express();
const http = require("http");
const server = http.createServer(app);
// set up port number
const port = 3000;
const bodyParser= require('body-parser');
const mongoose = require('mongoose')
const csv = require("./controller");
const { MongoClient } = require('mongodb');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> {
        console.log('Database connected');
    })
    .catch((error)=> {
        console.log(error)
        console.log('Error connecting to database');
    });
let count = 0
// set up home route
app.get('/', async (request, respond) => {
    server.getConnections((error, count) => console.log(count))
    await new Promise(resolve => setTimeout(resolve, 5000));
    respond.status(200).json({
        message: 'Welcome to Project Support',
    });
});
app.get('/csv', csv)
server.listen(port, (request, respond) => {
    console.log(`Our server is live on ${port}. Yay!`);
});