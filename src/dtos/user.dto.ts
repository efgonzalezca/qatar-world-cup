import Joi from 'joi';

const document = Joi.string().regex(new RegExp('^[1-9]{1}[0-9]{5,9}$')).min(6).max(10);

const id = Joi.string().regex(new RegExp('^[1-9]{1}[0-9]*$'))

const result = Joi.number();

export const modifyMatchFromUserParamsDto = Joi.object({
  userId: document
    .required(),
  id: id
    .required()
})

export const modifyMatchFromUserBodyDto = Joi.object({
  local_score: result
    .required(),
  visitor_score: result
    .required(),
})