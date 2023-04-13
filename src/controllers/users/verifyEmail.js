const { httpError } = require("../../helpers");
const {User} = require('../../models')

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw httpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
  res.json({
    message: "Verification successful"
  })
}

module.exports = verifyEmail;