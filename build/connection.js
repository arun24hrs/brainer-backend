"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const url = process.env.MongoURL || "";
const connection = mongoose_1.default.connect(url);
exports.default = connection;
