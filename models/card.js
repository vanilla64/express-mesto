const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const regexp = /^(https?):\/\/(w{3}\.)?[^#\s]+\.\w+\/?([^#\s]+)?[#]?$/gi;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, 'Введен корректный URL'],
    validate: {
      validator: (url) => regexp.test(url),
      message: (props) => `${props.value} некорректный URL!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: undefined,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('card', cardSchema);
