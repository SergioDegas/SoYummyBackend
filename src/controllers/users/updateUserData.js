const { User } = require("../../models");

const updateUserData = async (req, res) => {
  const id = req.user._id;
  const file = req.file.path;
  if (file) {
    await User.findByIdAndUpdate(id, { name: req.body.name, avatarURL: req.file.path });
  } else {
    	await User.findByIdAndUpdate(id, { name: req.body.name });
  }
	res.status().json({
		description: "success",
	});
};

module.exports = updateUserData;
