const { ctrlWrapper } = require('../../helpers');
const { getSearch } = require('./getSearch');

module.exports = {
    getSearch: ctrlWrapper(getSearch),
}