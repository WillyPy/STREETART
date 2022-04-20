var express = require("express");
var router = express.Router();
var uModel = require("../models/users");

router.get("/", async function (req, res, next) {
  console.log("sending all users");
  let result = await uModel.getAllUsers();
  res.status(result.status).send(result.result);
});

router.post("/sign", async function (req, res, next) {
  let newUser = req.body;
  let result = await uModel.saveUser(newUser);
  res.status(result.status).send(result.result);
});

module.exports = router;
