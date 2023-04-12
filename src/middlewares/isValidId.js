const { isValidObjectId } = require('mongoose');

const isValidId = (req, res, next) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) {
		res.status(404).json({ status: 404, message: 'Invalid id' });
	}
	next();
};

module.exports = isValidId;
