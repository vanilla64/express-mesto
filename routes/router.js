const router = require('express').Router();

const getCards = require('./card');
const getUsers = require('./users');

router.get('/cards', getCards);
router.get('/users', getUsers);
router.get('/users/:_id', getUsers);
router.get('/:url', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
