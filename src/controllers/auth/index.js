const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const { ctrlWrapper } = require('../../helpers');

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};
