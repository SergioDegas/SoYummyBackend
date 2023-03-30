const bcrypt = require("bcrypt");
const { uid } = require('uid');
const { httpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../model/user");
require("dotenv").config();

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });
  const userName = await User.findOne({ name });
  if (userEmail) {
    throw httpError(409, "Email in use")
  };
  if (userName) {
    throw httpError(409, "Name in use")
  };
  const createHashPassword = await bcrypt.hash(password, 10);
  const verificationToken = uid();
  const newUser = await User.create({
    ...req.body,
    password: createHashPassword,
    verificationToken: verificationToken,
  });
};

module.exports = {
  register: ctrlWrapper(register),
}