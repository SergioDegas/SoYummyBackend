const { Schema, model, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userModel = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		email: {
			type: String,
			match: emailRegexp,
			required: [true, "Email is required"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Set password for user"],
		},
		avatarURL: {
			type: String,
			default: "",
		},
		token: {
			type: String,
			default: "",
		},
		shoppingList: [
			{
				_id: false,
				id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "ingredient",
				},
				measure: {
					type: String,
				},
			},
		],

		favoriteRecipes: {
			type: [String],
			default: [],
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, "Verify token is required"],
		},
		subscription: {
			type: Boolean,
			default: false,
		  },
	},
	{ versionKey: false, timestamps: true },
);

userModel.post("save", handleMongooseError);

userModel.methods.setPassword = function (password) {
	this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userModel.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

const User = model("user", userModel);

module.exports = User;
