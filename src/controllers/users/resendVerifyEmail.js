const {  httpError } = require("../../helpers");
const { User } = require("../../models/user");
const sgMail = require('@sendgrid/mail');
require("dotenv").config();

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw httpError(400, "missing required field email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "Email not found");
  }
  if (user.verify) {
    throw httpError(400, "Verification has already been passed");
  }
  const emailData = {
		to: email,
		from: 'serhiilazar90@gmail.com',
		subject: 'Subscription info',
		html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank">Click verify email</a>`,
	};
	await sgMail
		.send(emailData)
		.then(() => console.log('Email send success'))
		.catch((error) => {
			console.log(error.message);
			return res.status(404).json({ message: error });
		});
}

module.exports = resendVerifyEmail;