import Joi from 'joi';

export const commentSchema = Joi.object({
  parent_id: [Joi.number().optional(), Joi.allow(null)],
  text: Joi.string().required().trim(),
});
