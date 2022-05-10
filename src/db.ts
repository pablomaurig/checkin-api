import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Room } from './entities/room.entity';
import { Survey } from '@entities/survey.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pablo',
  password: 'admin123',
  database: 'hotel',
  synchronize: true,
  logging: true,
  entities: [User, Room, Survey],
  subscribers: [],
  migrations: [],
});
