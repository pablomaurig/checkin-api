import joi from 'joi';

const id = joi.number();
const bookingId = joi.number();
const answer1 = joi.string();
const answer2 = joi.string();
const answer3 = joi.string();

export const createSurveySchema = joi.object({
  bookingId: bookingId.required(),
  answer1: answer1.required(),
  answer2: answer2.required(),
  answer3: answer3.required(),
});

export const getSurveySchema = joi.object({
  id: id.required(),
});
