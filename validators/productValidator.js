const Joi = require("joi");

const productSchema = Joi.object({
    title: Joi.string().trim().min(1).required(),
    description: Joi.string().trim().min(1).required(),
    price: Joi.number().min(0).required(),
});

module.exports = productSchema;