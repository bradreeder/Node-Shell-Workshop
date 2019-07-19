const fs = require("fs");
const filepath = process.cwd() + "/" + process.argv[2];

fs.readFile(filepath, (error, data) => {
  if (error) {
    process.stdout.write("error!!!");
  } else {
    process.stdout.write(data);
  }
});
