const jwt = require('jsonwebtoken');
const { user } = require('../../service');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
	const { email, password } = req.body;
	const responce = await user.findUser({ email: email });
	if (!responce || !responce.comparePassword(password)) {
		res.status(401).json({ status: 401, message: 'Email or password is wrong' });
	}

	const payload = {
		id: responce._id,
		email: email,
	};
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
	await user.updateUser(responce._id, { token });

	res.json({
		token: token,
		user: {
			id: responce._id,
			name: responce.name,
			email: responce.email,
			avatar: responce.avatarURL,
			verifyEmail: responce.verify,
		},
	});
};

module.exports = login;
