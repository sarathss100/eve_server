import { Document, Types } from "mongoose";

interface IUserDocument extends Document {
    _id: string | Types.ObjectId;
    name: string;
    email: string;
    phone_number: string;
    role: 'organizer' | 'attendee';
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
};

export default IUserDocument;