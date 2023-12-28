import { Schema } from "mongoose";
import { hashSync, compareSync, genSaltSync } from "bcryptjs";

const userSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: [true, "User email is required."],
      unique: true,
    },
    userPassword: {
      type: String,
      required: [true, "User password is required."],
    },
    userToken: {
      type: String,
    },
    userProjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "project",
      },
    ],
    userStripeCustomerId: {
      type: String,
    },
    userStripeCustomerEmail: {
      type: String,
    },
  },
  { versionKey: false, timeStamps: true }
);

userSchema.methods.setHashedPassword = function (rawPassword: string) {
  this.userPassword = hashSync(rawPassword, genSaltSync(10));
};

userSchema.methods.comparePasswords = function (incomingPassword: string) {
  return compareSync(incomingPassword, this.userPassword);
};

export default userSchema;
