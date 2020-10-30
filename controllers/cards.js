const Card = require('../models/card');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.getCard = async (req, res) => {
  const { _id } = req.params;

  try {
    const card = await Card.findById(_id);

    if (!card) {
      res.status(404).send({ message: `Карточка с id: ${_id} не найдена!` });
      return;
    }

    res.send(card);
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    if (err.name === 'CastError') {
      res.status(404).send({ message: `Карточка с id: ${_id} не найдена!` });
      return;
    }

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;

  try {
    const card = await Card.create({ name, link, owner: req.user._id });

    res.send(card);
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Введены некорректные данные!' });
      return;
    }

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const deletedCard = await Card.findById(req.params._id);

    if (!deletedCard) {
      res.status(404).send({ message: `Карточка с id: ${req.params._id} не найдена!` });
      return;
    }

    await Card.findByIdAndRemove(req.params._id);
    res.send({ message: 'Карточка удалена!' });
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    if (err.name === 'CastError') {
      res.status(404).send({ message: `Карточка с id: ${req.params._id} не найдена!` });
      return;
    }

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};
