const jwt = require('jsonwebtoken');
const { httpError } = require('../../helpers');
const User = require('../../models/user');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw httpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
    email,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token: token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatarURL,
      verifyEmail: user.verify,
    },
  });
};

module.exports = login;
