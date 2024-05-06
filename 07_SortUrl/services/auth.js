const jwt = require("jsonwebtoken");
const secreatKey = "$Srinibash$2001@123";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secreatKey
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secreatKey);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
