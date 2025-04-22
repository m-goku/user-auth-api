import { Request, Response } from "express";
import _ from "lodash";
require("dotenv").config();

import { User } from "../../model/userModel";
import { UserLoginTypes, UserRegisterTypes } from "../../types/types";
import {
  validateRegister,
  validateLogin,
} from "../../services/validationService";
import { generateToken } from "../../services/tokenServices";
import { comparePassword, hashPassword } from "../../services/passwordServices";
import { logger } from "../../services/loggerService";

export const Register = async (req: Request, res: Response) => {
  try {
    validateRegister(req.body);

    const newUser: UserRegisterTypes = req.body;

    const user = await User.findOne({ email: newUser.email });

    if (user)
      return res.status(409).json({
        message: "User already has an account, try logging in",
      });

    newUser.password = await hashPassword(newUser.password);

    const addUser = new User(newUser);
    await addUser.save();

    res.status(201).json({
      status: "SUCCESS",
      user: _.pick(addUser, ["_id", "email", "name"]),
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: `${error}`,
    });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    validateLogin(req.body);

    const userLogin: UserLoginTypes = req.body;
    const user = await User.findOne({ email: userLogin.email });
    if (!user)
      return res.status(404).json({
        message: "incorrect username or password",
      });

    const validPassword = await comparePassword(
      userLogin.password,
      user.password
    );
    if (!validPassword)
      return res.status(404).json({
        message: "incorrect username or password",
      });

    const token = generateToken(user._id, user.name);

    res.header("token", token).json({
      status: "SUCCESS",
      token: token,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: `${error}`,
    });
  }
};
