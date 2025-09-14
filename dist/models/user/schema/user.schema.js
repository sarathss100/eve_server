"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String },
    role: { type: String, default: 'attendee' },
    password: { type: String },
}, { timestamps: true });
exports.default = UserSchema;
