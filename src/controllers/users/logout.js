const { user } = require('../../service');

const logout = async (req, res) => {
	const id = req.user._id;
	await user.updateUser(id, { token: '' });
	res.status(204).json({
		message: 'Logout success',
	});
};

module.exports = logout;
