const joi = require("joi");

const productSchema = joi.object({
    title: joi.string().trim().min(1).required(),
    description: joi.string().trim().min(1).required(),
    price: joi.number().min(0).required(),
});

module.exports = productSchema;