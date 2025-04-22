import { Request, Response, NextFunction } from "express";
import JWT, { JwtPayload } from "jsonwebtoken";
require("dotenv").config();

type userPayload = {
  id: string;
  name: string;
};

export interface AuthRequest extends Request {
  user?: userPayload | JwtPayload;
}

const KEY = process.env.APP_KEY as string;

export const AuthenticateUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("token");
  try {
    if (token) {
      if (KEY) {
        try {
          const user: any = JWT.verify(token, KEY);
          if (user) {
            req.user = {
              id: user._id,
              name: user.name,
            };
          }
        } catch (error: any) {
          return res.status(500).json({
            success: false,
            message: error.message,
          });
        }

        next();
      } else {
        return res.status(400).json({
          success: false,
          message: "No Token Verification Key Provided",
        });
      }
    } else
      return res.status(400).json({
        success: false,
        message: "No Token Provided",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "The Token Provided is Invalid",
    });
  }
};
