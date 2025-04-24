import express, { Express } from "express";
require("dotenv").config({ path: "../.env" });

import { dbConnect } from "./db/connectionDb";
import cors from "cors";
import { userRouter } from "./route/userRoutes";
import { homeRouter } from "./route/homeRoutes";
import { AuthenticateUser } from "./middlewares/authMiddleware";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/auth", userRouter);
app.use("/home", AuthenticateUser, homeRouter);
app.use("/user", AuthenticateUser, userRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => dbConnect());
