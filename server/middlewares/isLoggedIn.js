function isLoggedIn(req, res, next) {
  console.log("hereeee");
  console.log(req);
  next();
}
module.exports = isLoggedIn;
