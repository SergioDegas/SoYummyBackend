const recipesRouter = require("./recipes");
const ingredientsRouter = require("./ingredients");
const authRouter = require('./auth');
const searchRouter = require('./search');
const userRouter = require('./user')

module.exports = {
  recipesRouter,
  authRouter,
  ingredientsRouter,
  searchRouter,
  userRouter,
};

