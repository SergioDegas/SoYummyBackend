const { uid } = require("uid");
const { User } = require("../../models");

const login = require("./login");
require("dotenv").config();

const register = async (req, res) => {
	const { name, email, password, avatarURL } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		res.status(409).json({ status: 409, message: "Email in use" });
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
