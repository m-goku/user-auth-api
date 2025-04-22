import express from "express";
import { home } from "../controllers/homeController";

export const homeRouter = express.Router();

homeRouter.get("/", home);
