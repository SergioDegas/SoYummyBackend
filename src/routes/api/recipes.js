const express = require('express');
const recipesCtrl = require('../../controllers/recipes');
const { ownRecipesAdd, ownRecipesDelete } = require('../../controllers/getOwnRecipes');
const { authenticate, isValidId, schemaValidator, uploadCloud } = require('../../middlewares');

const router = express.Router();

router.get('/category-list', authenticate, recipesCtrl.getCategoryList);
router.get('/popular-recipes', recipesCtrl.getPopularRecipes);

router.get('/main-page', authenticate, recipesCtrl.getMainPage);

router.get('/category/:category', authenticate, recipesCtrl.getRecipesByCategory);

router.get('/:id', authenticate, isValidId, recipesCtrl.getRecipeById);

router.post('/', authenticate, schemaValidator, uploadCloud('images'), ownRecipesAdd);
router.delete('/:id', authenticate, isValidId, ownRecipesDelete);

module.exports = router;
