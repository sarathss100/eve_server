import { Schema, Types } from "mongoose";

const EventSchema = new Schema({
    organizer_id: { type: Types.ObjectId, ref: "Users", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    initial_ticket_count: { type: Number },
    total_tickets: { type: Number, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

EventSchema.pre("save", function (next) {
    if (this.isNew) {
        this.initial_ticket_count = this.total_tickets;
    }
    next();
});

export default EventSchema;