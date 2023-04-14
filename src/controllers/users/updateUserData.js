const { user } = require('../../service');

const updateUserData = async (req, res) => {
	const id = req.user._id;
	const { name } = req.body;
	if (req.file) {
		await user.updateUser(id, { name: name, avatarURL: req.file.path });
	} else {
		await user.updateUser(id, { name: name });
	}
	res.status(200).json({
		status: 200,
		message: 'success',
	});
};

module.exports = updateUserData;
