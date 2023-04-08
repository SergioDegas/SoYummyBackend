const isEmpty = require("lodash.isempty");
const isBodyNotEmpty = (message = "Missing required fields") => {
	const func = (req, res, next) => {
		if (isEmpty(req.body)) {
			next({ status: 400, message });
		}
		next();
	};

	return func;
};

module.exports = isBodyNotEmpty;
