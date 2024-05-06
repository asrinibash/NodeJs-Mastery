const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
  const authorizationHeaderValue = req.headers("authorization");
  req.user = null;

  if (
    !authorizationHeaderValue ||
    !authorizationHeaderValue.startsWith("Bearer")
  )
    return next();

  const token = userUid.split("Bearer ")[1];
  req.user = getUser(token);
  return next();
}

// async function restrictToLoggedInUserOnly(req, res, next) {
//   // const userUid = req.cookies.uid;  // for cookies based authentication
//   const userUid = req.headers["authorization"];
//   // const user = getUser(userUid);

//   if (!userUid) return res.redirect("/login");
//   const token = userUid.split("Bearer ")[1]; //the token split with Bearer and token value
//   const user = getUser(token);

//   if (!user) return res.redirect("/login");
//   req.user = user;
//   next();
// }
// async function checkAuth(req, res, next) {
//   // const userUid = req.cookies.uid;
//   console.log(req.headers);
//   const userUid=req.headers["authorization"];
//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);

//   req.user = user;
//   next();
// }

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuth,
};
