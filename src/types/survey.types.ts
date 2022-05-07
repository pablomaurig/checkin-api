/* eslint-disable no-unused-vars */
export interface Survey {
  id: string;
  bookingId: string;
  answer1: string;
  answer2: string;
  answer3: string;
}

export type CreateSurvey = Pick<
  Survey,
  'bookingId' | 'answer1' | 'answer2' | 'answer3'
>;
