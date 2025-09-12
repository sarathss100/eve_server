import { z } from "zod";

export const EventSchema = z.object({
    event_id: z.string().min(1, { message: "Event ID is required" }).optional(),
    organizer_id: z.string().min(1, { message: "Organizer ID is required" }).optional(),
    title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" }).max(500, { message: "Description must be at most 500 characters long"}),
    date: z.preprocess(
        (val) => (val ? new Date(val as string) : undefined),
    z.date().refine((d) => !isNaN(d.getTime()), { message: "Invalid date format" })),
    location: z.string().min(3, { message: "Location must be at least 3 characters long" }),
    total_tickets: z.number().int().positive({ message: "Total tickets must be a positive number" }),
});
