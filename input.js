var assert = require("assert");
var fs = require("fs");
var zlib = require("zlib");
var BloomFilter = require("bloomfilter").BloomFilter;

console.log("Reading compressed table from disk...")
var buffer = fs.readFileSync("filter.deflate");

console.log("Inflating compressed table...")
var result = zlib.inflateSync(buffer);

console.log("Reconstructing bloom filter from table...")
var array = JSON.parse(result.toString());
var set = new BloomFilter(array, 10);

console.log("Verifying bloom filter...");
assert(!set.test(1234566));
assert(set.test(1234567));
assert(!set.test(1234568));
