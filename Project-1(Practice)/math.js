// function add(a, b) {
//   return a + b;
// }
// function sub(a, b) {
//   return a - b;
// }

// //until we have exports the method will treated as private function

// module.exports = add;
// module.exports = sub; // it will exports the above export
// // if we need multiple exports then we should use... JS object concept

// module.exports = {   //multi exports
//   add,
//   sub, //then we can use it like math.add and math.sub
// };

//Exports using exports object

exports.add = (a, b) => a + b;   //it shows in import file is anonymous funtion
exports.sub = (a, b) => a - b;   
