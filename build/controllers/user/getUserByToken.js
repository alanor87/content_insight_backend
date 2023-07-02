"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@/utils");
async function getUserByToken(req, res, next) {
    try {
        const user = await (0, utils_1.getUser)({ _id: req.userId });
        if (!user)
            throw Error("User not found.");
        const { userPassword, _id, ...userDataToSend } = user.toObject();
        res.status(200).json({
            message: "User is logged in.",
            body: userDataToSend,
        });
    }
    catch (error) {
        const originalErrorMessage = error.message;
        error.message = `Error getting user by token. \n ` + originalErrorMessage;
        next(error);
    }
}
exports.default = getUserByToken;
