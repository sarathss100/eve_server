import { Schema, Types } from "mongoose";

const PaymentSchema = new Schema({
    ticket_id: { type: Types.ObjectId, ref: "Tickets", required: true },
    payment_id: { type: String, required: true },
    amount: { type: Number, required: true },
    payment_method: { type: String, default: 'online' },
    payment_status: { type: String, default: 'paid' },
}, { timestamps: true });

export default PaymentSchema;