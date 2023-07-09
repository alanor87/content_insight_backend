"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// this one is for the path alias resolution in the js runtime.
require("module-alias/register");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api = __importStar(require("@/api"));
const middleware_1 = require("./middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const errorHandler = (error, _, res, __) => {
    const { code = 500, message = "Server error." } = error;
    console.log(error);
    res.status(code).json({
        status: "error",
        code,
        message,
    });
};
const allowedCorsOrigin = process.env.NODE_ENV === "development" ? "*" : "this is to figure out later";
app.use((0, cors_1.default)()); // for now a wildcard.
app.use(express_1.default.json());
app.use("/widget", api.widget);
/** Serving static react app to client, test mode for now, while still not sure if front and backend will be hosted separately or no. */
app.use("/", express_1.default.static(path_1.default.join(process.cwd(), "build/public")));
app.use("/cabinet", express_1.default.static(path_1.default.join(process.cwd(), "build/public")));
/** Serving static small test page with a tiny chat interface. */
app.use("/apiTest", express_1.default.static(path_1.default.join(process.cwd(), "build/public/apiTest")));
app.use("/api/v1/auth", api.auth);
app.use("/api/v1/user", middleware_1.tokenValidation, api.user);
app.use("/api/v1/projects", middleware_1.tokenValidation, api.projects);
app.use("/api/v1/getCompletion", api.getRequestCompletion); // no token validation for now for testing purposes
app.use((req, res) => {
    console.log(req.path);
    res.status(404).json({
        status: "error",
        message: "Not found!",
    });
    return;
});
app.use(errorHandler);
