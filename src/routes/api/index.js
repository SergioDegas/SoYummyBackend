const recipesRouter = require('./recipes');
const ingredientsRouter = require('./ingredients');
const authRouter = require('./auth');
const userRouter = require('./users');
const searchRouter = require('./search');

module.exports = {
	recipesRouter,
	authRouter,
	ingredientsRouter,
	searchRouter,
	userRouter,
};
