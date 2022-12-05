const path = require("path"),
  fs = require("fs"),
  options = {
    key: fs.readFileSync(__dirname + "/selfsigned.key"),
    cert: fs.readFileSync(__dirname + "/selfsigned.crt"),
  };

module.exports = options;