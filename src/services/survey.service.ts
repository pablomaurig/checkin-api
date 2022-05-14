import { Survey } from '../entities/survey.entity';
import { CreateSurvey } from '../types/survey.types';

class SurveyService {
  async getSurveys() {
    const surveys = await Survey.find();
    return surveys;
  }

  async createSurvey(body: CreateSurvey) {
    const { bookingId, answer1, answer2, answer3 } = body;

    const survey = new Survey();
    survey.bookingId = bookingId;
    survey.answer1 = answer1;
    survey.answer2 = answer2;
    survey.answer3 = answer3;

    await survey.save();

    return survey.id;
  }
}

export default SurveyService;
