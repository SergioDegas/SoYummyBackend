const { ctrlWrapper } = require('../../helpers');
const ownRecipesAdd = require('./ownRecipesAdd');
const ownRecipesDelete = require('./ownRecipesDelete');
const ownRecipesGet = require('./ownRecipesGet');

module.exports = {
    ownRecipesAdd: ctrlWrapper(ownRecipesAdd),
    ownRecipesDelete: ctrlWrapper(ownRecipesDelete),
    ownRecipesGet: ctrlWrapper(ownRecipesGet),
}
