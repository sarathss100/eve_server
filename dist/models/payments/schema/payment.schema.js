"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    ticket_id: { type: mongoose_1.Types.ObjectId, ref: "Tickets", required: true },
    payment_id: { type: String, required: true },
    amount: { type: Number, required: true },
    payment_method: { type: String, default: 'online' },
    payment_status: { type: String, default: 'paid' },
}, { timestamps: true });
exports.default = PaymentSchema;
