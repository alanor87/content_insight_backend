import { RequestUserIdType } from "@/types/common";
import { getUser } from "@/utils";
import { Response, NextFunction } from "express";

async function getUserByToken(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await getUser({ _id: req.userId });
    if (!user) throw Error("User not found.");
    const { userPassword, _id, ...userDataToSend } = user.toObject();
    res.status(200).json({
      message: "User is logged in.",
      body: userDataToSend,
    });
  } catch (error: any) {
    const originalErrorMessage = error.message;
    error.message = `Error getting user by token. \n ` + originalErrorMessage;
    next(error);
  }
}

export default getUserByToken;
