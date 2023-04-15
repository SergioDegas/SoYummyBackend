const jwt = require('jsonwebtoken');
const { user } = require('../../service');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
	const { email, password } = req.body;
	const response = await user.findUser({ email });
	if (!response || !response.comparePassword(password)) {
		res.status(401).json({ status: 401, message: 'Email or password is wrong' });
	}
	const { _id: id, name, avatarURL: avatar, verify: verifyEmail } = response;
	const payload = {
		id,
		email,
	};
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
	await user.updateUser(id, { token });

	res.json({
		token,
		user: {
			id,
			name,
			email,
			avatar,
			verifyEmail,
		},
	});
};

module.exports = login;
