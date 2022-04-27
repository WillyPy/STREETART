var express = require("express");
var router = express.Router();
var pModel = require("../models/projects");

router.get("/", async function (req, res, next) {
  console.log("sending all projects");
  let result = await pModel.getAllProjects();
  res.status(result.status).send(result.result);
});
module.exports = router;
