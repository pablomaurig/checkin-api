import 'reflect-metadata';
import 'module-alias/register';
import 'source-map-support/register';
import app from './app';
import { AppDataSource } from './db';
import { config } from './config/config';

const port = config.port;

async function main() {
  await AppDataSource.initialize();
  app.listen(port, () => {
    console.log('Server is running on port: ', port);
  });
}

main();
