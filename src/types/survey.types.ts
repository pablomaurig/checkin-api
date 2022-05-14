/* eslint-disable prettier/prettier */
export interface Survey {
  id: number;
  bookingId: number;
  answer1: number;
  answer2: number;
  answer3: number;
}

export type CreateSurvey = Pick<
  Survey,
  'bookingId' | 'answer1' | 'answer2' | 'answer3'
>;
