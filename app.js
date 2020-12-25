const express = require('express');
const routes = require('./routes');
const sessionConfig = require('./config/session-config');
const formatBirth = require('./helpers/birthFormat');
const app = express();
const port = process.env.PORT || 3000;

app.locals.formatBirth = formatBirth;

app.use(sessionConfig);
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(routes);
app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})