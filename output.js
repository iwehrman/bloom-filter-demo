var crypto = require('crypto');
var zlib = require("zlib");
var BloomFilter = require("bloomfilter").BloomFilter;
var fs = require("fs");

function randomValueHex (len) {
    return parseInt(crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len), 16);   // return required number of characters
}
var randomID = randomValueHex.bind(this, 24);

var size = 5000000;
var cohort = [];
console.log("Generating random cohort of size", size, "...");
for (var i = 0; i < size; i++) {
    cohort.push(randomID());
}

// Used for verification
cohort.push(1234567);

console.log("Compressing explicit cohort...")
var result = zlib.deflateSync(new Buffer(JSON.stringify(cohort)));

console.log("Writing compressed cohort...")
fs.writeFileSync("cohort.deflate", result, "binary");

console.log("Generating bloom filter for cohort...");
var n = 47925292; // optimal for 5M elements
var k = 7;
var set = new BloomFilter(n, k);
cohort.forEach(function (id) {
    set.add(id);
});

var array = [].slice.call(set.buckets),
    buffer = new Buffer(JSON.stringify(array));

console.log("Compressing bloom filter table...");
result = zlib.deflateSync(buffer);

console.log("Writing compressed table to disk...");
fs.writeFileSync("filter.deflate", result, "binary");
