import mongoose, { Model } from "mongoose";
import IEventDocument from "../interfaces/IEvent";
import EventSchema from "../schema/event.schema";

export const EventModel: Model<IEventDocument> = mongoose.model<IEventDocument>('Events', EventSchema);