const joi = require("joi");

const productSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
});

module.exports = productSchema;