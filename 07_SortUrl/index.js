const express = require("express");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const path = require("path");
const cookieParser = require("cookie-parser");

const { restrictToLoggedInUserOnly,checkAuth } = require("./middleware/auth");
const staticRouter = require("./routes/static");
const urlRouter = require("./routes/url");
const UserRouter = require("./routes/user");

const app = express();
const PORT = 8001;
connectToMongoDB("mongodb://127.0.0.1:27017/short_url").then(() =>
  console.log("MongooDB Connected")
);

//EJS configuration for the serverside redering
app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); //view folder contains ejs files

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Middleware Plugins
app.use("/url",restrictToLoggedInUserOnly, urlRouter);
app.use("/user",UserRouter);
app.use("/", checkAuth,staticRouter);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
