const express = require("express"),
  router = express.Router(),
  path = require("path"),
  pjsonGlobal = require("../../package.json");

router.use("/version", (_, res) => {
  console.log(`test`, res);
  res.status(200).json({ version: pjsonGlobal.version });
});

router.use(express.static(path.join(__dirname, "/../app")));
router.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/../app", "index.html"));
});

module.exports.router = router;
