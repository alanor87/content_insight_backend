"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@/models");
async function getUser(filter, populate = true) {
    const user = populate
        ? models_1.User.findOne(filter).populate("userProjects")
        : models_1.User.findOne(filter);
    if (!user)
        throw Error('User not found.');
    return user;
}
exports.default = getUser;
