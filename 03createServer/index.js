const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();

  const myUrl = url.parse(req.url, true); //used url npm library // by parsing true it return search query object
  console.log(myUrl);
  const log = `${Date.now()} :${req.url} New Request Received\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("You are on home Page");
        break;

      case "/about":
        res.end(`Hello I'm ${myUrl.query.user_name}`);
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
