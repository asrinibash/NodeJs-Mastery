const express = require("express");
const data = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const port = 8000;

//Middleware concepts:
app.use(express.urlencoded({ extended: false })); //->* this middleware helps to convert frontend data to object and put into the req.body

app.use((req, res, next) => {
  console.log("Hello from Middleware: 1");
  req.myUserName = "srinibash"; //this assigned data can access in the next middle ware or APIs
  // res.send({ message: "Verify your details" }); // it stops the API request here
  next(); // calling next middleware
});

app.use((req, res, next) => {
  console.log("hello from middleware: 2", req.myUserName);
  // res.end("hey you stop in middleware 2");
  next();
});

//creating logs by using middle wares
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`,
    (err, dat) => {
      next();
    }
  );
});




//hybrid APIs
app.get("/users", (req, res) => {
  const html = `
      <ul>
      ${data
        .map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
        .join("")}
      </ul>
      `;
  return res.send(html);
});

//REST APIs -> check out task.txt page for detailing of REST APIs
app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName","A Srinibash Achary"); //Custom header
  //for good practice for build custom header always append 'X-' before it like 52 line
  return res.json(data);
});

//MiddleWare
app.use(express.urlencoded({ extended: false }));

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = data.find((user) => user.id == id);
  if(!user) return res.status(404).json({message:"user not found"})
  if (user) {
    return res.json(user);
  } else {
    return res.json({ message: `id ${id ? id : ""} doesnot exist` });
  }
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  if(!body.first_name || !body.last_name || !body.email){
    return res.status(201).json({message:"require all fields"})
  }
  data.push({ id: data.length + 1, ...body });
  fs.writeFile("MOCK_DATA.json", JSON.stringify(data), (error, dat) => {
    return res.json({ id: data.length, status: "success" });
  });
});

//Uses of Route in api: We can use route, if the APIs have same path but different methods
app
  .route("/api/users/:id")
  .patch((req, res) => {
    const id = req.params.id;
    const body = req.body;
    const user = data.find((user) => user.id == id);
    const index = data.indexOf(user);
    data[index] = body;
    console.log(body);
    fs.writeFile("MOCK_DATA.json", JSON.stringify(data), (err, dat) => {
      return res.send({ status: "success" });
    });
  })
  .delete((req, res) => {
    const id = req.params.id;
    const user = data.find((user) => user.id == id);
    const index = data.indexOf(user);
    data.splice(index, 1);
    fs.writeFile("MOCK_DATA.json", JSON.stringify(data), (err, dat) => {
      return res.send({ message: `id: ${id} is removed`, status: "success" });
    });
  });

app.patch("/api/users/:id", (req, res) => {
  //todo: edit exiting user
  return res.json({ status: "pending" });
});

app.delete("/api/users/:id", (req, res) => {
  //todo: delete exiting user
  return req.json({ status: "pending" });
});

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
