declare namespace NodeJS {
  export type ProcessEnv = {
    PORT: number;
    DB_URL: string;
    DB_LOCAL_URL: string;
    NODE_ENV: string;
    PASSWORD_SALT: number;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_SECRET_EXPAIR_IN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_SECRET_EXPAIR_IN: string;
  };
}
