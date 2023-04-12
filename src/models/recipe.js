const { Schema, model } = require('mongoose');
const { categories } = require('../data');

const recipeModel = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Set title for recipe'],
		},

		category: {
			type: String,
			enum: [...categories],
			required: [true, 'Set category for recipe'],
		},

		area: {
			type: String,
		},

		instructions: {
			type: String,
			required: [true, 'Set instructions for recipe'],
		},

		description: {
			type: String,
		},

		thumb: {
			type: String,
			required: [true, 'Set image for recipe'],
		},

		preview: {
			type: String,
		},

		time: {
			type: String,
			required: true,
		},

		popularity: {
			type: Number,
			default: 0,
		},

		favorites: {
			type: [String],
			default: [],
		},

		youtube: {
			type: String,
		},

		ingredients: {
			type: Array,
			default: [],
		},

		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{ versionKey: false, timestamps: true }
);

const Recipe = model('recipe', recipeModel);

module.exports = Recipe;
