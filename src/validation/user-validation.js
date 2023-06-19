import Joi from "joi";

const RegisterUserValidation = Joi.object({
     username: Joi.string().max(100).required(),
     password: Joi.string().max(100).required(),
     nama: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
     username: Joi.string().max(100).required(),
     password: Joi.string().max(100).required(),
});

const getUserValidation = Joi.string().max(100).required();

export {
     RegisterUserValidation,
     loginUserValidation,
     getUserValidation
}

