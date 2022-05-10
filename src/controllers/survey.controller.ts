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
