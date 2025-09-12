import { z } from 'zod';

export const RegistrationSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name must not exceed 50 characters" }),

    email: z.email({ message: "Invalid email address" }),

    phone_number: z
        .string()
        .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),

    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
});