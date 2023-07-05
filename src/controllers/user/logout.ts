import { User } from "@/models";
import { RequestUserIdType } from "@/types/common";
import { Response } from "express";

const logout = async (
  req: RequestUserIdType,
  res: Response,
) => {
  try {
    await User.findOneAndUpdate({ _id: req.userId }, { userToken: "" });
  } catch (e) {
    console.log("Error logging out user, id : ", req.userId);
  } finally {
    res.status(200).json({
      status: "Success",
      message: "Logout success.",
    });
  }
};
export default logout;
