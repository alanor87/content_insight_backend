"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schemas_1 = require("./schemas");
const User = (0, mongoose_1.model)("user", schemas_1.userSchema);
exports.default = User;
