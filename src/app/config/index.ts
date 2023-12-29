import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.join(process.cwd(), '.env'),
});
// dotenv.config();

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const DB_LOCAL_URL = process.env.DB_LOCAL_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const PASSWORD_SALT = process.env.PASSWORD_SALT;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_ACCESS_SECRET_EXPAIR_IN = process.env.JWT_ACCESS_SECRET_EXPAIR_IN;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const JWT_REFRESH_SECRET_EXPAIR_IN = process.env.JWT_REFRESH_SECRET_EXPAIR_IN;
