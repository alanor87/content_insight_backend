"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schemas_1 = require("./schemas");
const Project = (0, mongoose_1.model)('project', schemas_1.projectSchema);
exports.default = Project;
