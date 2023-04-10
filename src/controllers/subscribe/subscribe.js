const subscribeSchema = require("../../schemas/subscribeSchema")
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY} = process.env; 

sgMail.setApiKey(SENDGRID_API_KEY);

const subscribe = async (req,res) => {
    const { error } = subscribeSchema.validate(req.body);
    if (error) {
      return res.status(404).json({ message: error.message });
    }
        const {email} = req.user;
        const {inputEmail} = req.body;
        if (email !==inputEmail) {
            return res.status(404).json({ message: "Please input your email for which you are registered" });
        }
        const emailData = {
          to: email,
          from: "serhiilazar90@gmail.com",
          subject: "Subscription info",
          html: `<p>You subscribed to our news!</p>`,
        }
        await sgMail.send(emailData)
        .then(()=>console.log("Email send success"))
        .catch(error=> {console.log(error.message)
        return res.status(404).json({ message: error });
        })
        res.status(200).json({
        status: 200,
        message: "success",
    });
}
module.exports = subscribe;