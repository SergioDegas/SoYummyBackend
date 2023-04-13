const { uid } = require('uid');
const { User } = require('../../models');
const sgMail = require('@sendgrid/mail');

const login = require('./login');
require('dotenv').config();

const { BASE_URL, SENDGRID_API_KEY } = process.env

sgMail.setApiKey(SENDGRID_API_KEY);

const register = async (req, res) => {
	const { name, email, password } = req.body;
  const user = await User.findOne({ email });
	if (user) {
		res.status(409).json({ status: 409, message: 'Email in use' });
	}
  const verificationToken = uid();

	const newUser = await User.create({
		name,
		email,
		password,
		verificationToken: verificationToken,
	});
	await newUser.setPassword(password);
  await newUser.save();
  const emailData = {
		to: email,
		from: 'serhiilazar90@gmail.com',
		subject: 'Subscription info',
		html: `<a href="${BASE_URL}/user/verify/${verificationToken}" target="_blank">Click verify email</a>`,
	};
	await sgMail
		.send(emailData)
		.then(() => console.log('Email send success'))
		.catch((error) => {
			console.log(error.message);
    });
  await login(req, res);
};

module.exports = register;
