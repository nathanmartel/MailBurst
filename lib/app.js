const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/addresses', require('./routes/addresses'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
