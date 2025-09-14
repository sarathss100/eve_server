"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSchema = void 0;
const zod_1 = require("zod");
exports.EventSchema = zod_1.z.object({
    event_id: zod_1.z.string().trim().min(1, { message: "Event ID is required" }).optional(),
    organizer_id: zod_1.z.string().trim().min(1, { message: "Organizer ID is required" }).optional(),
    title: zod_1.z.string().trim().min(3, { message: "Title must be at least 3 characters long" }),
    description: zod_1.z
        .string()
        .trim()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(500, { message: "Description must be at most 500 characters long" }),
    date: zod_1.z.preprocess((val) => (val ? new Date(val) : undefined), zod_1.z.date().refine((d) => !isNaN(d.getTime()), { message: "Invalid date format" })),
    location: zod_1.z.string().trim().min(3, { message: "Location must be at least 3 characters long" }),
    initial_ticket_count: zod_1.z.number().int().positive({ message: "Total tickets must be a positive number" }).optional(),
    total_tickets: zod_1.z.number().int().positive({ message: "Total tickets must be a positive number" }),
    price: zod_1.z.number().int().positive({ message: "Price must be a positive number" }),
});
