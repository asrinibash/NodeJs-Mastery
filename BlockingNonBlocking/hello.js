const fs = require("fs");


//synchronous task  -> in synchronous task the sync task block the next line code until it done
// console.log("task-1");
// console.log("task-2");

// const data = fs.readFileSync("./read.txt",'utf-8');
// console.log(data);

// console.log("task- 4");
// console.log("task-5");


//Asynchronous task -> in Asyncronous task the async code will run smothly and doesnot block the next line code 
// console.log("task-1");
// console.log("task-2");

// fs.readFile("./read.txt",'utf-8',(err,res)=>{
//     console.log((err)?err:res);
// });

// console.log("task- 4");
// console.log("task-5");


//find the length of the cpu of your device
const os=require("os");
console.log(os.cpus().length);
