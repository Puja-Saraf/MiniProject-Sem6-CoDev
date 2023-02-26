const express = require("express");
const userRouter = new express.Router();
const userController = require("../controllers/user.js");

userRouter.get("/user", userController.getSingleUser);

userRouter.put("/user", userController.updateUser);

module.exports = userRouter;
