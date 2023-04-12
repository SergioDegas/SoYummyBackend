const { registerSchema, loginSchema } = require('./authSchema');
const addIngredientToList = require('./addIngredientsSchema');
const { joiOwnRecipesSchema } = require('./ownRecipesSchema');
module.exports = {
	'/auth/register': registerSchema,
	'/auth/login': loginSchema,
	'/user/shopping-list': addIngredientToList,
	'/ownRecipes': joiOwnRecipesSchema,
};
