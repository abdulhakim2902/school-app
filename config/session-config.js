const session = require('express-session');

module.exports = session({
    secret: 'hacktiv8',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
})