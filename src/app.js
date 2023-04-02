const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { recipesRouter, authRouter, ingredientsRouter } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/recipes", recipesRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

app.use(({ status = 500, message = "Internal Server Error", details = null }, req, res, next) => {
	const result = { message };

	if (details) {
		result.details = details;
	}
	res.status(status).json(result);
});

module.exports = app;
