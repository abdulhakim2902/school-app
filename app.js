const express = require('express');
const routes = require('./routes');
const session = require('express-session');
const { sessionConfig } = require('./config/config.json');
const formatBirth = require('./helpers/birthFormat');
const app = express();
const port = process.env.PORT || 3000;

app.locals.formatBirth = formatBirth;

app.use(session(sessionConfig));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(routes);
app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})