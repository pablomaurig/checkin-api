import { Survey } from '../entities/survey.entity';

class SurveyService {
  async getSurveys() {
    const surveys = await Survey.find();
    return surveys;
  }
}

export default SurveyService;
