const router = require('express').Router();

const path = require('path');

const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');
const readFile = require('../utils/read-file');

router.get('/users', (req, res) => {
  readFile(usersDataPath)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
});

router.get('/users/:_id', (req, res) => {
  const { _id } = req.params;

  readFile(usersDataPath)
    .then((data) => {
      const userToFind = data.find((user) => user._id === _id);
      return userToFind;
    })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
});

module.exports = router;
