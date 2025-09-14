"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_schema_1 = __importDefault(require("../schema/user.schema"));
exports.UserModel = mongoose_1.default.model('Users', user_schema_1.default);
