const User = require('../models/user');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.getUser = async (req, res) => {
  const { _id } = req.params;

  try {
    const user = await User.findById(_id);

    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    }

    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(404).send({ message: `Пользователь с id: ${_id} не найден!` });
    }

    console.log(`ERROR: ${err.message}`);
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;

    const user = await User.create({ name, about, avatar });

    user.validate();
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Введены некорректные данные!' });
    }

    console.log(`ERROR: ${err.message}`);
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};
