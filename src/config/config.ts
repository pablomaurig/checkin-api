import 'dotenv/config';

interface Config {
  env?: string;
  isProd?: boolean;
  dbUrl?: string;
  apiKey?: string;
  port: number | string;
  jwtSecret: string;
  smtpEmail: string;
  smtpPassword: string;
  recoveryUrl: string;
}

export const config: Config = {
  env: process.env.NODE_ENV || 'dev',
  // isProd: process.env.NODE_ENV === 'production',
  // dbUrl: process.env.DATABASE_URL,
  // apiKey: process.env.API_KEY,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET as string,
  smtpEmail: process.env.SMTP_EMAIL as string,
  smtpPassword: process.env.SMTP_PASSWORD as string,
  recoveryUrl: process.env.RECOVERY_URL as string,
};
