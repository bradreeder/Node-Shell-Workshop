## Lesson 1 - Writing your own shell script

_Please clone this repo and go into the lesson-1 folder in your terminal. The relevant files for this lesson are there._

### Introduction

It's important to realise that, in giving you access to the file system and network,
node can be used for more than just creating web servers. In this series of lessons we are going to use some of node's features to do some shell scripting!

A shell script is a program designed to be run by the Unix shell. Typical operations performed by shell scripts include file manipulation, program execution, and printing text.

You've likely come across some typical shell commands already. Have you used `cat`, `ls`, or `grep` in your terminal before? To start off today, you're going to implement your own version of the `cat` command using javascript.

From your terminal if you want to execute a javascript program you've written you can use the following command:

```
node path_to_program.js
```

Note the path you give to the program is relative to what directory you are in.

Something you may not know is that you can actually pass arguments into your javascript program from the command line as well. For example:

```
node path_to_program.js node is awesome
```

All arguments (in this case `'node'`, `'is'`, and `'awesome'`, separated by spaces) will be passed into your program as strings and can be accessed inside it using an object called `process` that is in-built with node.

`process` has a property called `argv`. It is an array. `process.argv[0]` is always the path to node on your machine, and `process.argv[1]` is always the path to the executed javascript file.

In this case `process.argv` will be:

```javscript
process.argv // = [path_to_node, path_to_current_file, 'node', 'is', 'awesome'];

//so you can access the arguments you pass in like so:

process.argv[2] // = 'node';
process.argv[3] // = 'is';
process.argv[4] // = 'awesome';

```

This is useful as it means we can pass into our programs the names of, or paths to, files, to be manipulated within the node program.

`process` has other useful methods. One in particular is `process.stdout.write()`. It is very similar to `console.log()` in that it will take what you input it and output it to the terminal. It has subtle differences, try experimenting with both in this exercise.

In this case if we use `node path_to_file.js node is awesome` to call `path_to_file.js` and inside the program write:

```
process.stdout.write(process.argv[2] + process.argv[3] + process.argv[4]);
```

It will output `node is awesome` to the terminal.

### Task 1a - cat command

In unix, `cat` is a command that takes the path to a file as its argument and will output the contents of that file to the terminal. It is used like this:

`cat path_to_file.extension`

Try outputting the contents of `index.html` in the public folder of this repo to the terminal to see what it looks like.

Inside `cat.js` write a program that when called like this from the terminal

`node path_to_cat.js path_to_file.extension`

will output the contents of that latter file to the terminal like `cat`.

*Hint: You will need the `process` object and the `fs` module.*

### Task 1b - options

Many unix commands have what are called options. Options are arguments you can pass to the execution of the command that modify its behaviour. They are typically in the format of a dash followed by a lowercase letter.

For example, `cat -n` will print not only the file itself to the terminal, but also the corresponding line numbers.

Your task is to modify your existing cat command in cat.js so that it can accept an option argument. If `-n` is passed as first argument (`node path_to_cat.js -n`), your cat command should print the corresponding line numbers to the terminal, in addition to the file itself. Your program should do its normal behaviour if no arguments are provided.
