const fs = require("fs");

function write(json, filepath) {
  const data = JSON.stringify(json, null, 2);
  fs.writeFileSync(filepath, data);
}

module.exports = {
  write,
};
