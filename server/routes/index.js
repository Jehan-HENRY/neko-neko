const express = require("express"),
  router = express.Router(),
  path = require("path"),
  pjsonGlobal = require("../../package.json");

router.get("/version", (_, res) => {
  res.send(`WELCOME TO NeKO nEko API V${pjsonGlobal.version}`);
});

router.use(express.static(path.join(__dirname, "/../client/build")));
router.get("/*", function (_, res) {
  res.sendFile(path.join(__dirname, "/../client/build", "index.html"));
});

module.exports.router = router;
