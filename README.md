# Bloom Filter Example

```
$ npm install
  ...
$ node output.js 
  Generating random cohort of size 5000000 ...
  Compressing explicit cohort...
  Writing compressed cohort...
  Generating bloom filter for cohort...
  Compressing bloom filter table...
  Writing compressed table to disk...
$ du -h *.deflate
   44M    cohort.deflate
  7.5M    filter.deflate
$ node input.js 
  Reading compressed table from disk...
  Inflating compressed table...
  Reconstructing bloom filter from table...
  Verifying bloom filter...
```
