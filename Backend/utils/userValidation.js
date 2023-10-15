// utils/userValidation.js
const joi = require("joi");

const validateUserRegistration = async (email, password, confirm_password) => {
  const userschema = joi
    .object({
      email: joi.string().email({ minDomainSegments: 2 }).optional(),
      password: joi
        .string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=])[a-zA-Z0-9!@#$%^&*()_\-+=]{8,}$/
        ),
      confirm_password: joi.ref("password"),
    })
    .with("password", "confirm_password");

  return await userschema.validateAsync({ email, password, confirm_password });
};

module.exports = { validateUserRegistration };
