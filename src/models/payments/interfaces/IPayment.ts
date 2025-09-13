import { Document, Types } from "mongoose";

interface IPaymentDocument extends Document {
    _id: string | Types.ObjectId;
    ticket_id: string | Types.ObjectId;
    amount: number;
    payment_method: 'online' | 'offline';
    payment_status: 'pending' | 'paid' | 'refunded';
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
};

export default IPaymentDocument;