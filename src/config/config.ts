import 'dotenv/config';

interface Config {
  env?: string;
  isProd?: boolean;
  dbUrl?: string;
  apiKey?: string;
  port: number | string;
  jwtSecret: string;
}

export const config: Config = {
  // env: process.env.NODE_ENV || 'dev',
  // isProd: process.env.NODE_ENV === 'production',
  // dbUrl: process.env.DATABASE_URL,
  // apiKey: process.env.API_KEY,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET as string,
};
