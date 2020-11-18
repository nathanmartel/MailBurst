const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/addresses', require('./routes/addresses'));
app.use('/api/v1/campaigns', require('./routes/campaigns'));
app.use('/api/v1/postcards', require('./routes/postcards'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
