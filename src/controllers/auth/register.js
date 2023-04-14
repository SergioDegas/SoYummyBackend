const { user } = require('../../service');
const sgMail = require('@sendgrid/mail');

const login = require('./login');
require('dotenv').config();

const { BASE_URL, SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const register = async (req, res) => {
	const { email } = req.body;
	const responce = await user.findUser({ email: email });
	if (responce) {
		res.status(409).json({ status: 409, message: 'Email in use' });
	}
	const newUser = await user.userCreate(req.body);
	const emailData = {
		to: email,
		from: 'serhiilazar90@gmail.com',
		subject: 'Subscription info',
		html: `<a href="${BASE_URL}/user/verify/${newUser.verificationToken}" target="_blank">Click verify email</a>`,
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
