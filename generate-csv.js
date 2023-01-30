var fs = require('fs');
const fileName = "large.csv";
const fileWriteStream = fs.createWriteStream(fileName);

for (let i = 1; i <= 1e6; i++) {
    fileWriteStream.write(`Product_${i},SKU${i}\n`);
}