const { user } = require('../../service');

const updateUserData = async (req, res) => {
	const id = req.user._id;
	const { name } = req.body;
	const newUser = req.file?.path
		? await user.updateUser(id, { name, avatarURL: req.file.path })
		: await user.updateUser(id, { name });
	res.status(200).json({
		status: 200,
		message: 'success',
		user: newUser,
	});
};

module.exports = updateUserData;
