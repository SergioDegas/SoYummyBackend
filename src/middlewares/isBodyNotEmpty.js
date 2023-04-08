const { isEmpty } = require("lodash");
const isBodyNotEmpty = (message = "Missing required fields") => {
	const func = (req, res, next) => {
		if (isEmpty(req.body)) {
			res.status(400).json({ message });
		}
		next();
	};

	return func;
};

module.exports = isBodyNotEmpty;
