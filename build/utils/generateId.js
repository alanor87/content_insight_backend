"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const generateId = (input) => (0, node_crypto_1.createHash)('md5').update(input).digest('hex');
exports.default = generateId;
