const recipesRouter = require("./recipes");
const ingredientsRouter = require("./ingredients");
const authRouter = require('./users')

module.exports = {
  recipesRouter,
  authRouter,
  ingredientsRouter
};

