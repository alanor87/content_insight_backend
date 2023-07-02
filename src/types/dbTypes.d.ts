import { Document } from "mongoose";
import { UserType } from "./common";

/** Extended interface for the custom methods, that are attached to the User schema - for hashing and comparing of passwords. */
interface IUserDocument extends UserType, Document {
  setHashedPassword: (rawPassword: string) => Promise<void>;
  comparePasswords: (incomingPassword: string) => Promise<boolean>;
}
