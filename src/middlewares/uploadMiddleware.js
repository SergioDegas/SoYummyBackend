const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

const uploadMiddleware = (value) => {
	cloudinary.config({
		cloud_name: CLOUDINARY_NAME,
		api_key: CLOUDINARY_KEY,
		api_secret: CLOUDINARY_SECRET,
	});

	const storage = new CloudinaryStorage({
		cloudinary: cloudinary,
		params: {
			folder: `so_yummy/${value}`,
		},
		filename: (req, file, cb) => {
			cb(null, file.originalname);
		},
	});

	const uploadCloud = multer({ storage });

	return uploadCloud.single('image');
};

module.exports = uploadMiddleware;
