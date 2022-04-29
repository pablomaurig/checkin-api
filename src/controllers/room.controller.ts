import { Request, Response, NextFunction } from 'express';
import RoomService from '@services/room.service';

const service = new RoomService();

export const createRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {   
        floor, 
        name, 
        description, 
        singleBeds, 
        doubleBeds 
    } = req.body;
      const id = await service.createRoom({ 
          floor, 
          name, 
          description, 
          singleBeds, 
          doubleBeds 
        });
  
      res.json(id);
    } catch (error) {
      next(error);
    }
  };

export const updateRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const room = await service.updateRoom(parseInt(id), req.body);

    res.json(room);
  } catch(error){
    next(error);
  }
};     
