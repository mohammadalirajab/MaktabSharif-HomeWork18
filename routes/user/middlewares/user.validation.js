const { Joi } = require("express-validation");

const signupValidation = {
  body: Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string()
      .min(5)
      .regex(/(?=.*[0-9])/)
      .required(),
  }),
};

const signinValidation = {
  body: Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
  }),
};

module.exports = { signupValidation, signinValidation };
