import boom from '@hapi/boom';
import { Survey } from '../entities/survey.entity';
import { CreateSurvey } from '../types/survey.types';

class SurveyService {
  async getSurveys() {
    const surveys = await Survey.find();
    return surveys;
  }

  async getSurveyByBooking(bookingId: number) {
    const survey = await Survey.findOneBy({
      bookingId: bookingId,
    });
    if (!survey) {
      throw boom.notFound('Survey not found');
    }

    return survey;
  }

  async createSurvey(body: CreateSurvey) {
    const { bookingId, answer1, answer2, answer3 } = body;

    const survey = new Survey();
    survey.bookingId = parseInt(bookingId);
    survey.answer1 = answer1;
    survey.answer2 = answer2;
    survey.answer3 = answer3;

    await survey.save();

    return survey.id;
  }
}

export default SurveyService;
