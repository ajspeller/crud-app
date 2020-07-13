require('dotenv').config();
require('./database/db');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

// book routes
const bookRoutes = require('./routes/books.route');

// body parsing
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(morgan('dev'));

// routes
app.use('/books', bookRoutes);

app.listen(port, () => {
  console.log('app listening on port: ', port);
});
