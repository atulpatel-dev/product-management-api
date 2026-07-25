const Joi = require("joi");

const userSchema = Joi.object({
    name: Joi.string().trim().min(2).required(),
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().min(6).required(),
})

module.exports = userSchema;