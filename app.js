const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const path = require('path');

const router = require('./routes/router');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
