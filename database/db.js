const mongoose = require('mongoose');

// database connection
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('database connection successful');
  })
  .catch((err) => {
    console.log('database connection failure', err);
  });
