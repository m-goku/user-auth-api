import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";

export const home = (req: AuthRequest, res: Response) => {
  const name = req.user.name;
  res.status(200).send(`Welcome Home ${name}`);
};
