const app = module.exports = require('express')();

app.use(`/api/notes`, require(`./notes`));
