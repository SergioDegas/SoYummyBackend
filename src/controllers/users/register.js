const bcrypt = require("bcrypt");
const { uid } = require('uid');
const { httpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../model/user");
require("dotenv").config();

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use")
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