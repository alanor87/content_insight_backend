"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("@/utils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { SECRET_KEY = "" } = process.env;
const login = async (req, res, next) => {
    try {
        const { userEmail, userPassword } = req.body;
        const requestedUser = await (0, utils_1.getUser)({ userEmail });
        if (!requestedUser ||
            !userPassword ||
            !requestedUser.comparePasswords(userPassword)) {
            res.status(403).json({
                status: "Forbidden.",
                message: "Invalid email or password.",
            });
            return;
        }
        const { _id } = requestedUser;
        const userToken = jsonwebtoken_1.default.sign({ _id }, SECRET_KEY, {
            expiresIn: "1h",
        });
        requestedUser.userToken = userToken;
        const userWithToken = await requestedUser.save();
        const { userPassword: notSendingBack, ...userDataToSend } = userWithToken.toObject(); // analog of getSnapshot in MST))
        res.status(200).json({
            status: "Success.",
            message: "User is logged in.",
            body: userDataToSend,
        });
    }
    catch (error) {
        const originalErrorMessage = error.message;
        error.message = `Error occured while logging in. ` + originalErrorMessage;
        next(error);
    }
};
exports.default = login;
