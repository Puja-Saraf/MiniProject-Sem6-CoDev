require("dotenv").config();
const mongoose = require("mongoose");
console.log(process.env.USER, process.env.PASSWORD);
const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.hwdhusd.mongodb.net/test`;
// console.log(url);
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
