const Course = require('./course')
const fastCsv = require('fast-csv')
const fs = require("fs");
const {MongoClient} = require("mongodb");
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
client.connect().then(()=> {
    console.log('Database connected');
})
    .catch((error)=> {
        console.log(error)
        console.log('Error connecting to database');
    });
const courses = client.db().collection('courses');
function csv(req, res) {

    const cursor = courses.find({}).stream()
    const start = Date.now()

    const transformer = (doc)=> {
        return {
            Id: doc._id,
            Title: doc.title,
            Description: doc.description,
        };
    }

    const filename = 'export.csv';
    var stream = fs.createWriteStream('myFile.csv', {highWaterMark: 32});
    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.writeHead(200, { 'Content-Type': 'text/csv' });

    res.flushHeaders();

    var csvStream = fastCsv.format({headers: true}).transform(transformer)
    cursor.pipe(csvStream).pipe(res);
    res.on('finish', () => console.log("Elapse Time: ", Date.now() - start))
}
module.exports = csv