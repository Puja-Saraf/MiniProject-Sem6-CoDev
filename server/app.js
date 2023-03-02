const express = require("express");
const cors = require("cors");
require("./db/connection.js");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const bodyParser = require("body-parser");
const authRouter = require("./routers/auth.js");
const userRouter = require("./routers/users.js");
const isLoggedIn = require("./middlewares/isLoggedIn.js");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// app.use(morgan("combined"));
// app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use("/auth", authRouter);

passport.serializeUser(function (user, done) {
  // console.log("serializeUser", user);
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  // console.log("deserializeUser", user);
  done(null, user);
});
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
app.get("/auth/error", (req, res) => res.send("Unknown Error"));
app.get(
  "/auth/github",
  (req, res, next) => {
    // console.log(req);
    next();
  },
  passport.authenticate("github", { scope: ["user:email"] })
);
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/error" }),
  function (req, res) {
    // console.log(req.user._json);
    const token = req.user._json.id;
    console.log(token);
    res.redirect("http://localhost:3000?token=" + token);
  }
);
app.get("/logout", (req, res) => {
  req.logOut(() => {});
  res.redirect("/");
});

app.use("/users", isLoggedIn, userRouter);

app.get("/*", (req, res) => {
  console.log("req", req.user);
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/auth/login", (req, res) => {
  console.log("login", req.body);
  res.redirect("/auth/github");
});
module.exports = app;
