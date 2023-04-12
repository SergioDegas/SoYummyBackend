const current = async (req, res) => {
	const { _id, name, email, avatarURL, verify, favoriteRecipes } = req.user;
	res.json({
		_id,
		name,
		email,
		avatarURL,
		verify,
		favoriteRecipes,
	});
};

module.exports = current;
