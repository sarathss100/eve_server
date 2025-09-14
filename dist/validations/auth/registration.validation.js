"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationSchema = void 0;
const zod_1 = require("zod");
exports.RegistrationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name must not exceed 50 characters" }),
    email: zod_1.z.email({ message: "Invalid email address" }),
    phone_number: zod_1.z
        .string()
        .trim()
        .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
    password: zod_1.z
        .string()
        .trim()
        .min(6, { message: "Password must be at least 6 characters long" }),
});
