const { Schema, model } = require('mongoose');

const regexp = /^(https?):\/\/(w{3}\.)?[^#\s]+\.\w+\/?([^#\s]+)?[#]?$/gi;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, 'Введен корректный URL'],
    validate: {
      validator: (url) => regexp.test(url),
      message: (props) => `${props.value} некорректный URL!`,
    },
  },
});

module.exports = model('user', userSchema);
