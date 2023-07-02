"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUser_1 = __importDefault(require("./getUser"));
/** Check if the project belongs to the user by ids. Throws in case of mismatch. */
async function checkProjectOwnership(userId, projectId) {
    const user = await (0, getUser_1.default)({ _id: userId }, false);
    if (!user?.userProjects?.length ||
        !user?.userProjects?.find(project => project._id.toString() === projectId))
        throw Error("Project does not belong to this user.");
}
exports.default = checkProjectOwnership;
