import Joi from "joi"

const getPnsValidation = Joi.string().max(100).required();

const searchPNSValidation = Joi.object({
     page: Joi.number().min(1).positive().default(1),
     size: Joi.number().min(1).positive().max(100).default(10),
     nama: Joi.string().optional(),
     nip: Joi.string().optional(),
})

export {
     getPnsValidation,
     searchPNSValidation
}