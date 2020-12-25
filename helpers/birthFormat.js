const moment = require('moment');

module.exports = (place, date) => `${place}, ${moment(date).format('MMMM Do YYYY')}`