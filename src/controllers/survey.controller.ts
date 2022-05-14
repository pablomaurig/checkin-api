import { Request, Response, NextFunction } from 'express';
import SurveysService from '@services/survey.service';

const service = new SurveysService();

export const getSurveys = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const surveys = await service.getSurveys();

    res.json(surveys);
  } catch (error) {
    next(error);
  }
};

export const createSurvey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookingId, answer1, answer2, answer3 } = req.body;

    const id = await service.createSurvey({
      bookingId,
      answer1,
      answer2,
      answer3,
    });
    res.json(id);
  } catch (error) {
    next(error);
  }
};
