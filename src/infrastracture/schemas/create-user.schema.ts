import * as Joi from 'Joi';

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Password is too weak - 1 big letter, 1 special character, min 8 characters',
    }),
});
