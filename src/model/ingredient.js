const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  family: {
    type: String,
    required: false,
    default: "",
  },
});

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;
