import * as Joi from 'Joi';
import { Discipline } from '../../domain/enums/discipline';

const coordinatesSchema = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required(),
});
const addressSchema = Joi.object({
  street: Joi.string().allow(''),
  city: Joi.string().allow(''),
  postalCode: Joi.string().allow(''),
  coordinates: coordinatesSchema,
});
const locationSchema = Joi.object({
  name: Joi.string().allow(''),
  address: addressSchema,
  isMain: Joi.boolean().required(),
});

const socialMediaSchema = Joi.object({
  website: Joi.string().allow(''),
  facebook: Joi.string().allow(''),
  instagram: Joi.string().allow(''),
  tikTok: Joi.string().allow(''),
});

const gymImagesSchema = Joi.object({
  logo: Joi.string().uri(),
  background: Joi.string().uri(),
});

const contactSchema = Joi.object({
  email: Joi.string().required().messages({
    'string.base': `"email" should be a type of 'text'`,
    'string.empty': `"email" cannot be an empty field`,
    'any.required': `"email" is a required field`,
  }),
  phoneNumber: Joi.string().required().messages({
    'string.base': `"phoneNumber" should be a type of 'text'`,
    'string.empty': `"phoneNumber" cannot be an empty field`,
    'any.required': `"phoneNumber" is a required field`,
  }),
  socials: socialMediaSchema,
});

const disciplinesSchema = Joi.string()
  .valid(...Object.values(Discipline))
  .messages({
    'any.only': 'Discipline enum expected',
  });
export const createGymSchema = Joi.object({
  name: Joi.string().min(3).max(70).required().messages({
    'string.min': 'Gym name must be minimum 3 characters length',
    'string.max': 'Gym name must be maximum 70 characters length',
    'any.required': 'Gym name is required',
  }),
  description: Joi.string().min(3).max(400).required().messages({
    'string.min': 'Gym description must be minimum 3 characters length',
    'string.max': 'Gym description must be maximum 70 characters length',
    'any.required': 'Gym description is required',
  }),
  foundingDate: Joi.date().iso().less('now').required().messages({
    'date.less': 'foundingDate must be earlier than now',
    'date.format':
      "foundingDate must be in iso format yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
    'any.required': 'foundingDate should be provided',
  }),
  images: gymImagesSchema,
  contact: contactSchema,
  locations: Joi.array().items(locationSchema),
  disciplines: Joi.array().items(disciplinesSchema).min(1).required().messages({
    'array.min': 'At least one discipline should be provided',
    'any.required': 'At least one discipline should be provided',
  }),
});
