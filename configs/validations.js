const joi = require("@hapi/joi");

module.exports = {
  ValidateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        // throw result.error.details[0].message;
        return res.json(result.error.details[0].message);
      }

      if (!req.value) {
        req.value = {};
      }

      req.value["body"] = result.value;
      next();
    };
  },

  UserSchemas: {
    signupSchema: joi
      .object()
      .keys({
        firstName: joi.string().max(20).required().min(2).messages({
          "string.base": `firstName should be a type of 'text'`,
          "string.empty": `firstName cannot be an empty field`,
          "string.min": `firstName should have a minimum length of {2}`,
          "string.max": `firstName should have a maximum length of {20}`,
          "any.required": `firstName is a required field`,
        }),
        lastName: joi.string().max(20).required().min(2).messages({
          "string.base": `lastName should be a type of 'text'`,
          "string.empty": `lastName cannot be an empty field`,
          "string.min": `lastName should have a minimum length of {2}`,
          "string.max": `lastName should have a maximum length of {20}`,
          "any.required": `lastName is a required field`,
        }),
        email: joi
          .string()
          .regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-_]+\.?[a-zA-Z0-9-.]*$/)
          .max(100)
          .required()
          .messages({
            "string.pattern.base": `Wrong email pattern`,
            "string.max": `email should have a maximum length of {100}`,
            "any.required": `email is a required field`,
            "string.empty": `email cannot be an empty field`,
          }),
        password: joi
          .string()
          .required()
          .regex(
            /^(?=^.{8,20}$)(?=.*\d)(?=.*[!@#%^&*]*)(?![.\n])(?!.*[${}\/<>\[\]\"\'\`])(?=.*[A-Z])(?=.*[a-z]).*$/
          )
          .messages({
            "string.min": "Must have at least 8 characters",
            "object.regex": "Must have at least 8 characters",
            "string.pattern.base": "wrong password pattern",
            "any.required": `password is a required field`,
            "string.empty": `password cannot be an empty field`,
          }),
      })
      .options({}),

    loginSchema: joi
      .object()
      .keys({
        email: joi
          .string()
          .regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-_]+\.?[a-zA-Z0-9-.]*$/)
          .max(100)
          .required()
          .messages({
            "string.pattern.base": `Wrong email pattern`,
            "string.max": `email should have a maximum length of {100}`,
            "any.required": `email is a required field`,
            "string.empty": `email cannot be an empty field`,
          }),
        password: joi
          .string()
          .required()
          .regex(
            /^(?=^.{8,20}$)(?=.*\d)(?=.*[!@#%^&*]*)(?![.\n])(?!.*[${}\/<>\[\]\"\'\`])(?=.*[A-Z])(?=.*[a-z]).*$/
          )
          .messages({
            "string.min": "Must have at least 8 characters",
            "object.regex": "Must have at least 8 characters",
            "string.pattern.base": "wrong password pattern",
            "any.required": `password is a required field`,
            "string.empty": `password cannot be an empty field`,
          }),
      })
      .options({}),
  },
  messagesSchemas: {
    sendMessage: joi
      .object()
      .keys({
        receiver: joi
          .string()
          .regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-_]+\.?[a-zA-Z0-9-.]*$/)
          .max(100)
          .required()
          .messages({
            "string.pattern.base": `Wrong email pattern`,
            "string.max": `email should have a maximum length of {100}`,
            "any.required": `receiver is a required field`,
            "string.empty": `receiver cannot be an empty field`,
          }),
        message: joi.string().required().min(1).max(10000).messages({
          "string.min": "message must have at least 1 characters",
          "string.max": `message should have a maximum length of {10000}`,
          "any.required": `message is a required field`,
          "string.empty": `message cannot be an empty field`,
        }),
        subject: joi.string().allow(null).min(1).max(100).messages({
          "string.min": "subject must have at least 1 characters",
          "string.max": `subject should have a maximum length of {100}`,
        }),
      })
      .options({}),
  },
};
