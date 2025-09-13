import { Schema, Types } from "mongoose";

const TicketSchema = new Schema({
    event_id: { type: Types.ObjectId, ref: "Events", required: true },
    user_id: { type: Types.ObjectId, ref: "Users", required: true },
    ticket_status: { type: String, default: 'booked' },
}, { timestamps: true });

export default TicketSchema;