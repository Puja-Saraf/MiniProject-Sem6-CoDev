const express = require("express");
const cors = require("cors");
require("./db/connection.js");
const path = require("path");
// const morgan = require("morgan");
const bodyParser = require("body-parser");
const authRouter = require("./routers/auth.js");
const userRouter = require("./routers/users.js");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
