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
const tokenValidation = async (req, res, next) => {
    try {
        const [_, token] = req.headers.authorization.split(" ");
        const { _id } = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const user = await (0, utils_1.getUser)({ _id });
        if (!user) {
            res.status(404).json({
                status: "Not found.",
                code: 401,
                message: "User with current ID was not found",
            });
            return;
        }
        if (user.userToken !== token) {
            res.status(401).json({
                status: "Unauthorized.",
                code: 401,
                message: "Invalid token.",
            });
            return;
        }
        req.userId = _id;
        next();
    }
    catch (error) {
        res.status(401).json({
            status: "Unauthorized.",
            code: 401,
            message: "Token is invalid or expired.",
        });
    }
};
exports.default = tokenValidation;
