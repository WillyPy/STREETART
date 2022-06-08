var express = require("express");
var router = express.Router();
var aModel = require("../models/artists");

router.get("/", async function (req, res, next) {
  console.log("sending all artists");
  let result = await aModel.getAllArtists();
  res.status(result.status).send(result.result);
});
router.get("/:id", async function (req, res, next) {
  let id = req.params.id;
  console.log("Sending artist by id:" + id);
  let result = await aModel.getArtistById(id);
  res.status(result.status).send(result.result);
});
router.get("/:id/arts", async function (req, res, next) {
  let id = req.params.id;
  console.log(`sending user ${id} arts.`);
  let result = await aModel.getArtistArts(id);
  res.status(result.status).send(result.result);
});
module.exports = router;
