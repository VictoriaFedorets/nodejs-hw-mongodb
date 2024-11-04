import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number should have at least {#limit} characters',
    'string.max': 'Phone number should have at most {#limit} characters',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.base': 'Email should be a string',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Is favourite should be a boolean',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'Contact type should be a string',
      'string.min': 'Contact type should have at least {#limit} characters',
      'string.max': 'Contact type should have at most {#limit} characters',
      'any.required': 'Contact type is required',
      'any.only':
        'Contact type must be one of the following: work, home, personal',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number should have at least {#limit} characters',
    'string.max': 'Phone number should have at most {#limit} characters',
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.base': 'Email should be a string',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Is favourite should be a boolean',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .min(3)
    .max(20)
    .messages({
      'string.base': 'Contact type should be a string',
      'string.min': 'Contact type should have at least {#limit} characters',
      'string.max': 'Contact type should have at most {#limit} characters',
      'any.only':
        'Contact type must be one of the following: work, home, personal',
    }),
});
