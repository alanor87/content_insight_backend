"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const imgStorePath = path_1.default.join(process.cwd(), "uploads");
const storage = multer_1.default.memoryStorage();
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, imgStorePath)
//     },
//     filename: (req, file, cb) => {
//         const fileName = Date.now() + '_' + file.originalname;
//         cb(null, fileName)
//     },
// })
const filesUploadHandler = (0, multer_1.default)({ storage });
exports.default = filesUploadHandler;
