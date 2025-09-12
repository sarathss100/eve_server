import { Schema, Types } from "mongoose";

const EventSchema = new Schema({
    organizer_id: { type: Types.ObjectId, ref: "Users", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    total_tickets: { type: Number, required: true },
}, { timestamps: true });

export default EventSchema;