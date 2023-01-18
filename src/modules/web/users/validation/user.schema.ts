import Joi from 'joi';

export const userSchema = Joi.object({
  user_name: Joi.string().required().min(3).trim(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim(),
  home_page: Joi.string().optional().trim(),
});
