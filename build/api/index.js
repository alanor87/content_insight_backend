"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.widget = exports.projects = exports.user = exports.auth = exports.getRequestCompletion = void 0;
var getRequestCompletion_1 = require("./getRequestCompletion");
Object.defineProperty(exports, "getRequestCompletion", { enumerable: true, get: function () { return __importDefault(getRequestCompletion_1).default; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "auth", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var user_1 = require("./user");
Object.defineProperty(exports, "user", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var projects_1 = require("./projects");
Object.defineProperty(exports, "projects", { enumerable: true, get: function () { return __importDefault(projects_1).default; } });
var widget_1 = require("./widget");
Object.defineProperty(exports, "widget", { enumerable: true, get: function () { return __importDefault(widget_1).default; } });
