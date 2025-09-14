"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const event_schema_1 = __importDefault(require("../schema/event.schema"));
exports.EventModel = mongoose_1.default.model('Events', event_schema_1.default);
