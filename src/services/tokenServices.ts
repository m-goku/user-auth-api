require("dotenv").config();
import JWT from "jsonwebtoken";
import { logger } from "./loggerService";

export const generateToken = (id: any, name: string) => {
  let token: string;
  if (process.env.APP_KEY) {
    const generateToken = JWT.sign(
      { _id: id, name: name },
      process.env.APP_KEY
    );
    token = generateToken;
  } else {
    logger.error("Token Generation Key Missing");
  }
  return token;
};
