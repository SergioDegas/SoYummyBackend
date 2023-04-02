const { uid } = require('uid');
const { httpError } = require('../../helpers');
const User = require('../../model/user');
const login = require('./login');
require('dotenv').config();

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, 'Email in use');
  }
  const verificationToken = uid();
  const newUser = await User.create({
    name,
    email,
    password,
    verificationToken: verificationToken,
  });
  newUser.setPassword(password);
  newUser.save();
  login(req, res);
};

module.exports = register;
