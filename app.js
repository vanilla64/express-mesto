const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const path = require('path');

const router = require('./utils/router');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);
app.use('/:url', (req, res) => {
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
