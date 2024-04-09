const fs = require("fs"); // here we give direct name so it will find in node modules

// //Sync.. call
// fs.writeFileSync("./text.txt", "hey there i'm using nodejs"); //if run twice it will overide the file not create another file

// //Async...call  --> it additionaly take another parameter that is  error handling
// fs.writeFile("./AsyncText.txt", "Async call...hello world", (err) => {});

//Read files difference between sync and async

// const data = fs.readFileSync("./contextRead.txt", "utf-8");
// console.log(data);
//in sychronous files-> 1. it will return something in every of its function
//  2. if error will occure then it can be handle in try catch block

//Async type ->
// fs.readFile("./contextRead.txt", "utf-8", (err, results) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(results);
//   }
// });

//if we need to add or append data in the file we will use append method

// fs.appendFileSync("./text.txt", `\n${Date.now()} hey there`);
// fs.appendFile("./AsyncText.txt",`\n${Date.now()} Async call`,(err,result)=>{
//     console.log((err)?err:result);
// });

fs.copyFileSync("./hello.js", "./copy.txt"); // we can create a copy of a file

fs.unlinkSync("./copy.txt"); //for deleting a file

//for check stats of a file
console.log(fs.statSync("./text.txt"));
console.log(fs.statSync("./text.txt").isFile());

//for creating directory
// fs.mkdirSync('My-Docs')
// fs.mkdirSync("My-Docss/a/b", { recursive: true }); //it will create full directory recursively

//By using javascript we can't do the file handling but node js provide a module 'fs'
