const mongoose = require("mongoose");

const app = require('./src/app');

const { DB_HOST } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(4000)
    console.log("Database connection successful")
  }).catch(error => {
    console.log(error.message);
    process.exit(1);
  })