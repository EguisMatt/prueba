import * as dotenv from "dotenv";

dotenv.config();

export const DB_HOST: string | undefined = process.env.DB_HOST;
export const DB_PORT: string | undefined = process.env.DB_PORT;
export const DB_USER: string | undefined = process.env.DB_USER;
export const PORT: string | undefined = process.env.PORT;
export const DB_DATABASE: string | undefined = process.env.DB_DATABASE;
export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;
export const SECRET_KEY: string | undefined = process.env.SECRET_KEY;
export const USER_PWD: string | undefined = process.env.USER_PWD;
export const USER_PASS: string | undefined = process.env.USER_PASS;