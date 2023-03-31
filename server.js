const mongoose = require('mongoose');

const app = require('./src/app');

const { DB_HOST, PORT = 4000 } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(`Server running. Use our API on port: ${PORT}`);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
