import jwt from "jsonwebtoken";
import { pinecone } from "@/db/connect-pinecone";
import { User } from "@/models";
import { getUser } from "@/utils";
import { Request, Response, NextFunction } from "express";

import { UserType } from "@/types/common";

import {
  OPENAI_OUTPUT_DIMENSIONS,
  PINECONE_METRIC,
  PINECONE_POD_TYPE,
} from "@/utils/constants";

import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY = "" } = process.env;

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userEmail, userPassword = "" }: UserType = req.body;

    // Checking if the user with this email exist.
    const userEmailDoesExist = await getUser({ userEmail: userEmail });
    if (userEmailDoesExist) {
      res.status(409).json({
        status: "Conflict",
        message: "User with this email already exists.",
      });
      return;
    }

    // Creating new user in mongoDB.
    const newUser = new User({ userEmail });
    newUser.setHashedPassword(userPassword);
    const newUserData = await newUser.save();
    const { _id } = newUserData;
    const userToken = jwt.sign({ _id }, SECRET_KEY);
    const userWithToken = await User.findOneAndUpdate(
      { _id },
      { userToken: userToken },
      { new: true }
    );
    const { userPassword: notSendingBack, ...userDataToSend } =
      userWithToken!.toObject(); // analog of getSnapshot in MST))

    res.status(201).json({
      status: "Success",
      message: "User was created.",
      body: userDataToSend,
    });
  } catch (error: any) {
    error.message = `Error occured while creating user. ` + error.message;
    next(error);
  }
};

export default register;