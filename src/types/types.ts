import { Model, Document } from "mongoose";

export type UserRegisterTypes = {
  name: string;
  email: string;
  password: string;
};

export type UserLoginTypes = {
  email: string;
  password: string;
};

export type ChangePasswordTypes = {
  oldPassword: string;
  newPassword: string;
};
