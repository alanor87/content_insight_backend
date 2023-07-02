"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("@/controllers/user");
const router = (0, express_1.Router)();
router.use('/getUserByToken', user_1.getUserByToken);
router.use('/logout', user_1.logout);
exports.default = router;
