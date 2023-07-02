"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const userSchema = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "project",
        },
    ],
}, { versionKey: false, timeStamps: true });
userSchema.methods.setHashedPassword = function (rawPassword) {
    this.userPassword = (0, bcryptjs_1.hashSync)(rawPassword, (0, bcryptjs_1.genSaltSync)(10));
};
userSchema.methods.comparePasswords = function (incomingPassword) {
    return (0, bcryptjs_1.compareSync)(incomingPassword, this.userPassword);
};
exports.default = userSchema;
