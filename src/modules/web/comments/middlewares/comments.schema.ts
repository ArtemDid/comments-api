import Joi from 'joi';

export const userSchema = Joi.object({
  parent_id: Joi.number(),
  text: Joi.string().required().trim(),
});
