const router = require('express').Router();

const path = require('path');

const cardDataPath = path.join(__dirname, '..', 'data', 'cards.json');
const readFile = require('../utils/read-file');

router.get('/cards', (req, res) => {
  readFile(cardDataPath)
    .then((data) => {
      res.send(data);
    }).catch((err) => console.log(err));
});

module.exports = router;
