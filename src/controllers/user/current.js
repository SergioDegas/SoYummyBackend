const current = async (req, res) => {
  const { _id, name, email, avatarURL, verify } = req.user;
  res.json({
    _id,
    name,
    email,
    avatarURL,
    verify,
  });
};

module.exports = current;