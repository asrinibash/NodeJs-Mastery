const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const path = require("path");
const staticRouter = require("./routes/static");

const app = express();
const PORT = 8001;
connectToMongoDB("mongodb://127.0.0.1:27017/short_url").then(() =>
  console.log("MongooDB Connected")
);

//EJS configuration for the serverside redering
app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); //view folder contains ejs files

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/url", urlRoute);
app.use("/", staticRouter);

app.get("/html", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("homeUrl", {
    urls: allUrls,
  });
});

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
