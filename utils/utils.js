const linkRegexp = /^(https?):\/\/(w{3}\.)?[^#\s]+\.\w+\/?([^#\s]+)?[#]?$/gi;

const sendNotFoundErr = (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });

module.exports = { linkRegexp, sendNotFoundErr };
