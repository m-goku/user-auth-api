import Joi from "joi";

import {
  UserLoginTypes,
  UserRegisterTypes,
  ChangePasswordTypes,
} from "../types/types";

export const validateRegister = (body: UserRegisterTypes) => {
  const validationSchema = Joi.object<UserRegisterTypes>({
    name: Joi.string().min(5).max(100),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(25),
  });

  return validationSchema.validate(body);
};

export const validateLogin = (body: UserLoginTypes) => {
  const validationSchema = Joi.object<UserLoginTypes>({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(25),
    // .pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$"))
  });

  return validationSchema.validate(body);
};

export const validateChangePassword = (body: ChangePasswordTypes) => {
  const validationSchema = Joi.object<ChangePasswordTypes>({
    oldPassword: Joi.string().required().min(6).max(255),
    newPassword: Joi.string().required().min(6).max(255),
    // .pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$"))
  });

  return validationSchema.validate(body);
};
