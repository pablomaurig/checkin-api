/* eslint-disable prettier/prettier */
import joi from 'joi';

const bookingId = joi.number();
const answer1 = joi.number();
const answer2 = joi.number();
const answer3 = joi.number();

export const createSurveySchema = joi.object({
  bookingId: bookingId.required(),
  answer1: answer1.required(),
  answer2: answer2.required(),
  answer3: answer3.required(),
});
