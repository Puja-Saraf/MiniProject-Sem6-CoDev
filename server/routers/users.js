const express = require("express");
const userRouter = new express.Router();
const userController = require("../controllers/user.js");

userRouter.get("/user", userController.getSingleUser);

userRouter.put("/user", userController.updateUser);

userRouter.put("/myprofile", (req,res,next)=>{
    console.log("myprofile");
    next();
  }, userController.getSelf);

module.exports = userRouter;
