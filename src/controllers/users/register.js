const { uid } = require("uid");
const { httpError } = require("../../helpers");
const { User } = require("../../models");

const login = require("./login");
require("dotenv").config();

const register = async (req, res) => {
	const { name, email, password, avatarURL } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw httpError(409, "Email in use");
	}
	const verificationToken = uid();
	const newUser = await User.create({
		name,
		email,
		password,
		avatarURL,
		verificationToken: verificationToken,
	});
	await newUser.setPassword(password);
	await newUser.save();
	await login(req, res);
};

module.exports = register;
