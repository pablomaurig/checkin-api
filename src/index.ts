import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './db';

const PORT = 3000;

async function main() {
  await AppDataSource.initialize();
  app.listen(PORT, () => {
    console.log('Server is running on port: ', PORT);
  });
}

main();
