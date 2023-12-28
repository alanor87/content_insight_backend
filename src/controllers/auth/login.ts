import jwt from "jsonwebtoken";
import { getUser } from "@/utils";
import { Request, Response, NextFunction } from "express";
import { UserType } from "@/types/common";

import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY = "" } = process.env;

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userEmail, userPassword }: UserType = req.body;
    const requestedUser = await getUser({ userEmail });
    if (
      !requestedUser ||
      !userPassword ||
      !requestedUser.comparePasswords(userPassword)
    ) {
      res.status(403).json({
        status: "Forbidden.",
        message: "Invalid email or password.",
      });
      return;
    }

    const { _id } = requestedUser;
    const userToken = jwt.sign({ _id }, SECRET_KEY, {
      expiresIn: "3h",
    });
    requestedUser.userToken = userToken;
    const userWithToken = await requestedUser.save();
    const { userPassword: notSendingBack, ...userDataToSend } =
      userWithToken.toObject(); // analog of getSnapshot in MST))

      console.log(userWithToken);

    res.status(200).json({
      status: "Success.",
      message: "User is logged in.",
      body: userDataToSend,
    });
  } catch (error: any) {
    const originalErrorMessage = error.message;
    error.message = `Error occured while logging in. ` + originalErrorMessage;
    next(error);
  }
};

export default login;
