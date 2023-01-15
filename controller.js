const Course = require('./course')
const fastCsv = require('fast-csv')
const fs = require("fs");
function csv(req, res) {

    const cursor = Course.find({}).lean().cursor({batchSize: 1e6});
    console.time("start")

    const transformer = (doc)=> {
        return {
            Id: doc._id,
            Title: doc.title,
            Description: doc.description,
        };
    }

    const filename = 'export.csv';
    var stream = fs.createWriteStream('myFile.csv', {flags: 'a'});
    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.writeHead(200, { 'Content-Type': 'text/csv' });

    res.flushHeaders();

    var csvStream = fastCsv.format({headers: true}).transform(transformer)
    cursor.pipe(csvStream).pipe(stream);
    console.time("end")
}
module.exports = csv