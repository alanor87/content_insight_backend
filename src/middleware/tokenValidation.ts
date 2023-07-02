import jwt from "jsonwebtoken";
import { getUser } from "@/utils";
import { RequestUserIdType } from "@/types/common";
import { Response, NextFunction } from "express";

import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY = "" } = process.env;

const tokenValidation = async (
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) => {
  try {
    const [_, token] = req.headers.authorization!.split(" ");
    const { _id }: any = jwt.verify(token, SECRET_KEY);
    const user = await getUser({ _id });

    if (!user) {
      res.status(404).json({
        status: "Not found.",
        code: 401,
        message: "User with current ID was not found",
      });
      return;
    }

    if (user.userToken !== token) {
      res.status(401).json({
        status: "Unauthorized.",
        code: 401,
        message: "Invalid token.",
      });
      return;
    }

    req.userId = _id;
    next();
  } catch (error) {
    res.status(401).json({
      status: "Unauthorized.",
      code: 401,
      message: "Token is invalid or expired.",
    });
  }
};

export default tokenValidation;
