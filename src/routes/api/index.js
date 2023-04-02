const recipesRouter = require("./recipes");
const ingredientsRouter = require("./ingredients");
const authRouter = require('./users');
const searchRouter = require('./search');

module.exports = {
  recipesRouter,
  authRouter,
  ingredientsRouter,
  searchRouter
};

