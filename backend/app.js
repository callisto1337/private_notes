const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => console.log(`Сервер запущен на порту ${port}!`));
