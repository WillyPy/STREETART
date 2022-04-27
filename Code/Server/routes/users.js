var express = require("express");
var router = express.Router();
var uModel = require("../models/users");

router.get("/", async function (req, res, next) {
  console.log("sending all users");
  let result = await uModel.getAllUsers();
  res.status(result.status).send(result.result);
});

router.get("/:id", async function (req, res, next) {
  let id = req.params.id;
  console.log("Sending user by id:" + id);
  let result = await uModel.getUserById(id);
  res.status(result.status).send(result.result);
});

router.post("/login", async function (req, res, next) {
  let user = req.body;
  let result = await uModel.loginUser(user);
  res.status(result.status).send(result.result);
});

router.post("/sign", async function (req, res, next) {
  let newUser = req.body;
  let result = await uModel.newUser(newUser);
  res.status(result.status).send(result.result);
});

module.exports = router;
