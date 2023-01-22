import Joi from 'joi';

export const commentSchema = Joi.object({
  parent_id: [Joi.number().optional(), Joi.allow(null)],
  text: Joi.string().required().trim().max(255),
  limit: Joi.number(),
  offset: Joi.number(),
});
