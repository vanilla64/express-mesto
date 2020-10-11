const fsPromise = require('fs').promises;

function readFile(filePath) {
  return fsPromise.readFile(filePath, { encoding: 'utf8' })
    .then((file) => JSON.parse(file));
}

module.exports = readFile;
