"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
function widget(req, res, next) {
    try {
        res.sendFile(path_1.default.join(process.cwd(), "build/public/widget/script.js"), {
            headers: { "content-type": "application/javascript" },
        });
    }
    catch (error) {
        next(error);
    }
}
exports.default = widget;
