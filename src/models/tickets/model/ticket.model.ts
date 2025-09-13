import mongoose, { Model } from "mongoose";
import ITicketDocument from "../interfaces/ITicket";
import TicketSchema from "../schema/ticket.schema";

export const TicketModel: Model<ITicketDocument> = mongoose.model<ITicketDocument>('Tickets', TicketSchema);