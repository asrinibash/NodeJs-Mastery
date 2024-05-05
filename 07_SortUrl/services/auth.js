const sessionIdToUserMap = new Map();

function setUser(id, username) {
  sessionIdToUserMap.set(id, username);
}

function getUser(id) {
  return sessionIdToUserMap.get(id);
}

module.exports = {
  setUser,
  getUser,
};
