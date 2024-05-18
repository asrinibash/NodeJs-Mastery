const {getUser} = require("../services/auth");

function checkForAuthentication(req, res, next) {

    const tokenCookie = req.cookies?.token;
    req.user = null;

    if (!tokenCookie) return next();

    const token = tokenCookie;
    req.user = getUser(token);
    return next();
}

function restrictTo(roles = []) {
    return (req, res, next) => {
        if (!req.user) return res.redirect("/login");
        if (!roles.includes(req.user.role)) return res.end("Unauthorized");
    }
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
    checkForAuthentication, restrictTo,
};
