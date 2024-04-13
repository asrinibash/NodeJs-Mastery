const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} :${req.url} New Request Received\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("You are on home Page");
        break;

      case "/about":
        res.end("Hello I'm Srinibash");
        break;

      case "/help":
        res.end("help line number - +91-6372773960");
        break;

      default:
        res.end("404 not found");
    }
  });
});

myServer.listen(8000, () => console.log("Server Started"));
