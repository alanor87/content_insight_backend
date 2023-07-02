"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const connect_mongoose_1 = require("@/db/connect-mongoose");
const connect_pinecone_1 = __importDefault(require("@/db/connect-pinecone"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT = 3300 } = process.env;
connect_mongoose_1.mongoDBconnection
    .then(async () => {
    await (0, connect_pinecone_1.default)();
})
    .then(() => {
    app_1.app.listen(PORT, () => {
        console.log("Listening to the port!", PORT);
    });
})
    .catch((error) => console.log("DB connection error : ", error));
