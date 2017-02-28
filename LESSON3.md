## Lesson 3 - Using streams in your script

_Please go into the lesson-3 folder in your terminal. The relevant files for this lesson are there._

### Introduction

In this lesson we are going to cover an alternative way of reading and writing to files
using one of the core features of node: `streams`.

Whenever you've watched a video online, have you noticed you can start watching it
even though the whole video hasn't finished loading? That's because it is being 'streamed', bit by bit, so that as every chunk of its data becomes available it is immediately put to use.

A `stream` in node is simply an interface for working with 'streaming data' like this.
Streams can be `readable` (e.g. reading a file), `writable` (e.g. writing new content to a
file), or both.

### Streams in readFile

Let's start with something familiar. Up until now, whenever you've needed to read a file using node's `fs` module you've likely
done something like the following:

```javascript
fs.readFile(file, function(err, file) {
  if (err) console.error(err);
  // do something with file
});
```

It turns out that under the hood, `readFile` actually uses streams! Let's look at a simplified version of the `readFile` function:

```javascript
fs.readFile = function(file, cb) {

  var readStream = fs.createReadStream(file);
  //set up a read stream on a target file and store it in a variable

  var fileContent = '';
  //create an empty string we will use to store the contents of the read file.

  readStream.on('data', function(chunk) {
    fileContent += chunk;
  });
  //every time a new chunk of the read file becomes available we append it to our fileContent variable

  readStream.on('error', function(err) {
    cb(err, fileContent)
  });
  // handle errors

  readStream.on('end', function() {
    cb(null, fileContent);
  });
  // do something with fileContent
}
```

Now let's go through each bit in more detail, and explain what's happening.

`streams` have a method `stream.on('event', function () {})`. What it does is subscribes a function to the specified event, so that it will be executed every time the event occurs.

```
readStream.on('data', function (chunk) {
  fileContent += chunk;
});
```

Here `data` is the type of event. The target file of `readStream` will be read bit by bit. Every time a new chunk becomes available, the `data` event is triggered and the function is called. Its first argument is always
the contents of the new available `chunk`.

Here we just append each chunk of new content to the `fileContent` variable as soon
as it becomes available. Finally, when the stream has finished reading the file the `end` event is triggered.
At this point, the whole file has been read chunk by chunk, and the variable `fileContent`
should contain all the content of the read file.

### Task 3a - Read Streams

Inside `cat.js` re-write your `cat` command to use a read stream instead of `fs.readFile`.

To recap, your `cat` command should be executed like this:

`node cat.js file.extension`

It should output the contents of `file.extension` to the terminal. You can try using
your command on some example files in the public folder.

*Hint: If you see something like this get outputted to your terminal:*

```
<Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
```

*This is called a 'buffer'. It's an encoded format that represents the file's raw
binary data. Each part of the sequence `68`, `65`, `6c` etc, represent characters
of the file that is being read. `10` for example is equivalent to `/n`. To convert
the buffer into a string you can use the `toString()` method, or provide `'utf-8'` as the
second argument of `fs.createReadStream`.*

### Task 3b - Write Streams

If read streams let you read files, write streams let you write content to them!

Create a new file now called `write-stream.js` and try out the following. Type it rather than copy and paste:

```javascript
var fs = require("fs");
var data = 'Simply Easy Learning';

// Create a writable stream
var writeStream = fs.createWriteStream('output.txt');

// Write the data to stream with encoding to be utf8
writeStream.write(data,'UTF8');

// Mark the end of file
writeStream.end();

// When the stream finishes log 'write completed'
writeStream.on('finish', function() {
    console.log("Write completed.");
});
```

Now try running `node write-stream.js`. It should log `Write completed.` to the terminal and a new file called `output.txt` with the content `Simply Easy Learning` should have been created.

Did you notice write streams use `.write()` and `.end()` like the `response` object of your servers? That's because the `response` object is a write stream and when you're responding to the client you're 'writing' content to it!

The `request` object, likewise, is a read stream as when the client makes a request you're 'reading' the content that has been 'streamed' to the server!

### Task 3c - Redirection

In Unix, it is possible to take the output of a command that would normally be printed
to the terminal (standard output) and redirect it so that the contents of that output
are written to a file instead.

The command we use to accomplish this is `>` :

```
cat index.html > example.js
```

`cat index.html` will read the html file and output its contents, then `>` will take
this output and redirect it so that it is written to `example.js` instead.

Go into the public folder and try this:

```
node path_to_your_cat.js index.html > example.js
```

Can you see `example.js` now has been overwritten to contain the contents of `index.html`?

*(note: this command will over-write the file's prior content so be careful using this on your
solution scripts.)*

Inside `write.js` modify your `cat` command from the first exercise so that you can
give it the following arguments

```
node write.js read.extension '>' write.extension
```

If `'>'` is given as argument followed by another file as an argument it will,
instead of outputting the contents of `read.extension` to the terminal, write the contents
of it to `write.extension` instead.

*Hint: To write content to `write.extension` you will need to create a write stream like so:*

```javascript
var writeStream = fs.createWriteStream(write.extension)
```

*If you want to take the output of a read stream and make it become the input
of a write stream, this is called 'piping.' Piping in node is done using `streams`
`pipe()` method:*

```javascript
var readStream = fs.createReadStream(read.extension);
var writeStream = fs.createWriteStream(write.extension);

readStream.pipe(writeStream);
```
*What this code snippet means is every time a new `chunk` of `read.extension` gets read by
`readStream` it will immediately be redirected to become the input of `writeStream`. This input
will get written to `write.extension`.*

### Task 3d - Appending files

You may not always want to completely re-write the contents of a file. What if
you want the content of a file to remain intact but simply append new content
onto the end of it?

In Unix you can do this using `>>` :

```
cat index.html >> example.js
```

`cat index.html` will read the html file and output its contents, then `>>` will take
this output and redirect it so that it is appended to the contents of `example.js`.

Go into the public folder and try this:

```
node path_to_your_cat.js index.html >> example.js
```

Can you see `example.js` now has the contents of `index.html` appended onto the end?

Inside `append.js` modify your `cat` command from the first exercise so that you can
give it the following arguments

```
node append.js read.extension '>>' write.extension
```

If `'>>'` is provided as an argument followed by a file as another argument it will,
instead of outputting the contents of `read.extension` to the terminal, append
it to `write.extension` instead.

*Hint: There are multiple ways of solving this. `fs.createReadStream`, and `fs.createWriteStream`
can be passed a flags object as a second argument. In particular:*

```javascript
var writeStream = fs.createWriteStream(write.extension, { 'flags': 'a' })
```

*allows write streams to append instead of write content.*
