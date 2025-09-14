"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ticket_schema_1 = __importDefault(require("../schema/ticket.schema"));
exports.TicketModel = mongoose_1.default.model('Tickets', ticket_schema_1.default);
