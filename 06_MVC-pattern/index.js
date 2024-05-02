const express = require("express");

const userRouter = require("./routes/user");
const { connectMongoDB } = require("./connection");
const { logReqRes } = require("./middlewares");

const app = express();
const PORT = 8000;

//connection
connectMongoDB("mongodb://127.0.0.1:27017/user").then(() =>
  console.log("MongoDB is connexted Successfully")
);

// Middleware- Plugins (--API entry point)
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));  //creating log


//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is Started at ${PORT}`);
});
