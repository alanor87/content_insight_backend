"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDBconnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { MONGO_DB_NAME, MONGO_DB_USER, MONGO_DB_PASS } = process.env;
const DB_HOST = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@cluster0.chh3o.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
const mongoDBconnection = mongoose_1.default.connect(DB_HOST);
exports.mongoDBconnection = mongoDBconnection;
mongoose_1.default.connection.on('connected', () => {
    console.log('MongoDB connection open.');
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('MongoDB connection closed.');
});
mongoose_1.default.connection.on('error', () => {
    console.log('MongoDB connection error.');
});
