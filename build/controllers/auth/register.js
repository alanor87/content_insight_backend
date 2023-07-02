"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("@/models");
const utils_1 = require("@/utils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { SECRET_KEY = "" } = process.env;
const register = async (req, res, next) => {
    try {
        const { userEmail, userPassword = "" } = req.body;
        // Checking if the user with this email exist.
        const userEmailDoesExist = await (0, utils_1.getUser)({ userEmail: userEmail });
        if (userEmailDoesExist) {
            res.status(409).json({
                status: "Conflict",
                message: "User with this email already exists.",
            });
            return;
        }
        // Creating new user in mongoDB.
        const newUser = new models_1.User({ userEmail });
        newUser.setHashedPassword(userPassword);
        const newUserData = await newUser.save();
        const { _id } = newUserData;
        const userToken = jsonwebtoken_1.default.sign({ _id }, SECRET_KEY);
        const userWithToken = await models_1.User.findOneAndUpdate({ _id }, { userToken: userToken }, { new: true });
        const { userPassword: notSendingBack, ...userDataToSend } = userWithToken.toObject(); // analog of getSnapshot in MST))
        res.status(201).json({
            status: "Success",
            message: "User was created.",
            body: userDataToSend,
        });
    }
    catch (error) {
        error.message = `Error occured while creating user. ` + error.message;
        next(error);
    }
};
exports.default = register;
