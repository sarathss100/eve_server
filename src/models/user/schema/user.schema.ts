import { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String },
    role: { type: String, default: 'attendee' },
    password: { type: String },
}, { timestamps: true });

export default UserSchema;