const bcrypt = require('bcryptjs');
const hashPassword = (password, num = 10) => bcrypt.hashSync(password, bcrypt.genSaltSync(num));
const comparePassword = (hashPassword, password) => bcrypt.compareSync(password, hashPassword);

module.exports = { hashPassword, comparePassword }