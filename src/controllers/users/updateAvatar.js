const { User } = require("../../models");

const updateAvatar = async (req, res) => {
  const { name } = req.headers;
  const id = req.user._id;
  await User.findByIdAndUpdate(id, {name: name, avatarURL: req.file.path})
  res.status(200).json({
    description: "success",
  })
};

module.exports = updateAvatar;