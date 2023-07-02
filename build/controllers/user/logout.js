"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@/models");
const logout = async (req, res) => {
    try {
        await models_1.User.findOneAndUpdate({ _id: req.userId }, { userToken: "" });
    }
    catch (e) {
        console.log("Error logging out user, id : ", req.userId);
    }
    finally {
        res.status(200).json({
            status: "Success",
            message: "Logout success.",
        });
    }
};
exports.default = logout;
