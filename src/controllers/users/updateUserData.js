const { User } = require("../../models");

const updateUserData = async (req, res) => {
	const id = req.user._id;
	const avatarURL = req.file.path;
	const { name } = req.body;
	const newUser = avatarURL
		? await User.findByIdAndUpdate(id, { name, avatarURL }, { new: true }).select({
				name: 1,
				avatarURL: 1,
		  })
		: await User.findByIdAndUpdate(id, { name }, { new: true }).select({
				name: 1,
				avatarURL: 1,
		  });

	res.json({
		status: 200,
		message: "success",
		user: newUser,
	});
};

module.exports = updateUserData;
