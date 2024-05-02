const User = require("../model/User");

async function handlegetUser(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handlegetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
  return res.json({ message: "success" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ message: "Success" });
}

async function handleCreateUser(req, res) {
  const body = req.body;

  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.jobTitle
  ) {
    return res.status(400).json({ error: "All fields required" });
  }

  const result = User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });

  return res.status(201).json({
    message: "Success",
    id: result.id,
  });
}
module.exports = {
  handlegetUser,
  handlegetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUser
};
