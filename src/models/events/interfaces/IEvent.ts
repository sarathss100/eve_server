import { Document, Types } from "mongoose";

interface IEventDocument extends Document {
    _id: string | Types.ObjectId;
    organizer_id: string | Types.ObjectId;
    title: string;
    description: string;
    date: Date;
    location: string;
    initial_ticket_count: number;
    total_tickets: number;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
};

export default IEventDocument;