import { IUserDocument } from "@/types/dbTypes";
import { model } from "mongoose";
import { userSchema } from "./schemas";

const User = model<IUserDocument>("user", userSchema);

export default User;
