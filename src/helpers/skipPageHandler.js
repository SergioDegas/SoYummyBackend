const skipPageHandler = (page, limit) => {
	return (page - 1) * limit;
};

module.exports = skipPageHandler;
