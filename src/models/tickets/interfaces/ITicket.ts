import { Document, Types } from "mongoose";

interface ITicketDocument extends Document {
    _id: string | Types.ObjectId;
    event_id: string | Types.ObjectId;
    user_id: string | Types.ObjectId;
    session_id: string;
    amount: number;
    ticket_status: 'confirmed' | 'cancelled';
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
};

export default ITicketDocument;