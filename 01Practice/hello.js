// const currentDir = require('./nameofDir'); //by use './' it will search in current directory

const nodemodule = require("fs"); // by giving only name it will search in its inbuilt modules

const math = require("./math"); // we can use like math.add and math.sub

const { add, sub } = require("./math"); //or we can destructure it for use like direct 'add' and 'sub'

// console.log(add(8, 9));

// console.log(math);
console.log(nodemodule);



