const { User } = require('../../models');

const updateUserData = async (req, res) => {
	const id = req.user._id;
	const { name } = req.body;
	if (req.file) {
		await User.findByIdAndUpdate(id, { name: name, avatarURL: req.file.path });
	} else {
		await User.findByIdAndUpdate(id, { name: name });
	}

	res.json({
		status: 200,
		message: 'success',
		// user: newUser,
	});
};

module.exports = updateUserData;
