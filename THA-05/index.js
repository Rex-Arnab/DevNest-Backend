var fs = require ("fs");
fs.mkdirSync("day5"); // make folder

fs.writeFileSync("file/hello3.txt","hello bro pdhaee kar"); // write in the file 

fs.appendFileSync("day5/hello.txt",'hello');

fs.readFileSync("file/hello.txt");
// it gives buffer ( this  is for performance-> information in form of chunks)

fs.readFileSync("file/hello.txt","utf-8");// to read that buffer 

fs.renameSync("file/hello.txt","file/mellow.txt"); // rename the file

fs.unlinkSync("file/hello3.txt"); // delete the file