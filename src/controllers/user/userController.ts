require("dotenv").config();
import { Request, Response } from "express";
import _ from "lodash";
import { AuthRequest } from "../../middlewares/authMiddleware";

import { User } from "../../model/userModel";
import {
  UserLoginTypes,
  UserRegisterTypes,
  ChangePasswordTypes,
} from "../../types/types";
import {
  validateRegister,
  validateLogin,
  validateChangePassword,
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

export const ChangePassword = async (req: AuthRequest, res: Response) => {
  try {
    validateChangePassword(req.body);
    const id = req.user?.id;
    const password: ChangePasswordTypes = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: "FAILED",
        message: "No user with id found",
      });
    }

    const validPassword = await comparePassword(
      password.oldPassword,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({
        status: "FAILED",
        message: "Old Password is not correct",
      });
    }

    user.password = await hashPassword(password.newPassword);
    await user.save();

    res.status(200).json({
      status: "SUCCESS",
      message: "Password Changed Successfully",
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: `${error}`,
    });
  }
};
