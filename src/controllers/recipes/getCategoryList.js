const { httpError } = require("../../helpers");
const { categories } = require("../../helpers");

const getCategoryList = async (req, res) => {
    console.log(categories);
    const categoryList = [...categories].sort((a, b) => a.localeCompare(b));

    if (!categoryList) {
        throw httpError(404, "Not found");
    }

    res.status(200).json({
        status: 200,
        message: "success",
        data: { categoryList: categoryList },
    });
};

module.exports = getCategoryList;
