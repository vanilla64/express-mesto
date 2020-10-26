const router = require('express').Router();

const getCards = require('./cards');
const getUsers = require('./users');

router.get('/cards', getCards);
router.get('/cards/:_id', getCards);
router.post('/cards', getCards);
router.delete('/cards/:_id', getCards);

router.get('/users', getUsers);
router.get('/users/:_id', getUsers);
router.post('/users', getUsers);

router.get('/:url', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
