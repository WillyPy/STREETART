var express = require("express");
var router = express.Router();
var aModel = require("../models/arts");

router.get("/", async function (req, res, next) {
  console.log("sending all arts");
  let result = await aModel.getAllArts();
  res.status(result.status).send(result.result);
});
router.get("/:id", async function (req, res, next) {
  let id = req.params.id;
  console.log("Sending art by id:" + id);
  let result = await aModel.getArtById(id);
  res.status(result.status).send(result.result);
});
router.get("/:id/images", async function (req, res, next) {
  let id = req.params.id;
  console.log("Sending ar images by id:" + id);
  let result = await aModel.getArtImages(id);
  res.status(result.status).send(result.result);
});
/*
router.post("/sign", async function (req, res, next) {
  let newUser = req.body;
  let result = await uModel.saveUser(newUser);
  res.status(result.status).send(result.result);
});*/

module.exports = router;
