import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pablo',
  password: 'admin123',
  database: 'hotel',
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});
