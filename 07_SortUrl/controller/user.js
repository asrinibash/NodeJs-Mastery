const { User } = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.render("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  // console.log(user);
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or password",
    });
  }

  // const sessionId = uuidv4();
  // setUser(sessionId, user);   this is for statefull authentication
  const token = setUser(user); //for stateless
  // res.cookie("uid", token);    //for cookie based authentication
  return res.json({ token });
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
