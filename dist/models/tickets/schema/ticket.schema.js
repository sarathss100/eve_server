"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TicketSchema = new mongoose_1.Schema({
    event_id: { type: mongoose_1.Types.ObjectId, ref: "Events", required: true },
    user_id: { type: mongoose_1.Types.ObjectId, ref: "Users", required: true },
    session_id: { type: String, required: true },
    amount: { type: Number, required: true },
    ticket_status: { type: String, default: 'booked' },
}, { timestamps: true });
exports.default = TicketSchema;
