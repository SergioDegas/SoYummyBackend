const { ctrlWrapper } = require('../../helpers');
const current = require('./current');
const updateAvatar = require('./updateAvatar')

module.exports = {
  current: ctrlWrapper(current),
  updateAvatar: ctrlWrapper(updateAvatar),
}