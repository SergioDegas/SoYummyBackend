const { registerSchema, loginSchema } = require("./authSchema");
const addIngredientToList = require("./addIngredientsSchema");
module.exports = {
	"/auth/register": registerSchema,
	"/auth/login": loginSchema,
	"/user/shopping-list": addIngredientToList,
};
