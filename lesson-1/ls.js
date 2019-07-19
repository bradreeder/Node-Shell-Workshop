const fs = require("fs");

const filePath = process.cwd() + "/" + process.argv[2];
fs.readdir(filePath, (error, file) => {
  if (error) {
    console.log("error");
  } else {
    file.forEach(ele => process.stdout.write(ele + " "));
  }
});
