const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const { user } = require('../../service');

const { BASE_URL, SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	const responce = await user.findUser({ email: email });
	if (!email) {
		res.status(400).json({ status: 400, message: 'missing required field email' });
	}
	if (!user) {
		res.status(401).json({ status: 401, message: 'Email not found' });
	}
	if (user.verify) {
		res.status(400).json({ status: 400, message: 'Verification has already been passed' });
	}
	const emailData = {
		to: email,
		from: 'serhiilazar90@gmail.com',
		subject: 'Subscription info',
		html: `<a href="${BASE_URL}/user/verify/${responce.verificationToken}" target="_blank">Click verify email</a>`,
	};
	await sgMail
		.send(emailData)
		.then(() => console.log('Email send success'))
		.catch((error) => {
			console.log(error.message);
		});
};

module.exports = resendVerifyEmail;
