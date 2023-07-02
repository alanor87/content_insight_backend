"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProjectSchema = new mongoose_1.Schema({
    projectName: {
        type: String,
    },
    projectCreationDate: {
        type: Date,
    },
    projectURL: {
        type: String,
    },
    projectIngestedData: [
        {
            fileName: {
                type: String,
            },
            size: {
                type: String,
            },
        },
    ],
    ownedByUserId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
}, { versionKey: false, timeStamps: true });
exports.default = ProjectSchema;
