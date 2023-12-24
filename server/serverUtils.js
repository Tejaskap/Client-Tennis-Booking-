// server/serverUtils.js

let fs;
if (process?.versions?.node) {
  fs = require("fs");
}

module.exports = {
  fs: require("fs"),
};
