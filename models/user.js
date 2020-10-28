const { Schema, model } = require('mongoose');

const { linkRegexp } = require('../utils/utils');

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
    required: true,
    validate: {
      validator: (url) => linkRegexp.test(url),
      message: (props) => `${props.value} некорректный URL!`,
    },
  },
});

module.exports = model('user', userSchema);
