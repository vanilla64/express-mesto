const router = require('express').Router();

const routerCards = require('./cards');
const routerUsers = require('./users');
const { sendNotFoundErr } = require('../utils/utils');

router.use(routerCards);
router.use(routerUsers);

router.get('/', sendNotFoundErr);
router.post('/', sendNotFoundErr);
router.get('/:url', sendNotFoundErr);
router.post('/:url', sendNotFoundErr);

module.exports = router;
