const { user } = require('../../service');

const verifyEmail = async (req, res) => {
	const { verificationToken } = req.params;
	const responce = await user.findUser({ verificationToken: verificationToken });
	if (!responce) {
		res.status(404).json({ status: 404, message: 'User not found' });
	}
	await user.updateUser(responce._id, { verify: true, verificationToken: null });
	res.status(200).json({
		status: 200,
		message: 'Verification successful',
	});
};

module.exports = verifyEmail;
