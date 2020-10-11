const router = require('express').Router();

const getCards = require('../routes/card');
const getUsers = require('../routes/users');

router.get('/cards', getCards);
router.get('/users', getUsers);
router.get('/users/:_id', getUsers);

module.exports = router;
