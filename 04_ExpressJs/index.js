const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello From Home Page");
});

app.get("/about", (req, res) => {
  res.end(
    "hello frome about page. " +
      "hey " +
      req.query.name +
      ", you are " +
      req.query.age +
      "years old "
  );
});

app.listen(8000, () => {
  console.log("Server is Startd at 8000");
});

// http.createServer(app).listen(8000, (req, res) => {  //--> We no need to use http for creating server it will done express
//   console.log("Server is Started at 8000");
// });
