const Card = require('../models/card');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.getCard = async (req, res) => {
  const { _id } = req.params;

  try {
    const cards = await Card.findById(_id);

    res.send(cards);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(404).send({ message: `Карточка с id: ${_id} не найдена!` });
    }

    console.log(`ERROR: ${err.message}`);
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;

  try {
    const card = await Card.create({ name, link, owner: req.user._id });

    card.validate();
    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Введены некорректные данные!' });
    }

    console.log(`ERROR: ${err.message}`);
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndRemove(req.params._id);

    res.send({ message: 'Карточка удалена!' });
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(404).send({ message: `Карточка с id: ${req.params._id} не найдена!` });
    }

    console.log(`ERROR: ${err.message}`);
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};
