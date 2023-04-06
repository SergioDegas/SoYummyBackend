const { User } = require("../../models");

const updateUserData = async (req, res) => {
  const id = req.user._id;
  await User.findByIdAndUpdate(id, { name: req.body.name, avatarURL: req.file.path})
  res.status(200).json({
    description: "success",
  })
};

module.exports = updateUserData;