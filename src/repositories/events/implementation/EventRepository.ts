import { EventModel } from '../../../models/events/model/event.model';  
import BaseRepository from '../../base/implementation/BaseRepository';
import IBaseRepository from '../../base/interface/IBaseRepository';
import IEventRepository from '../interface/IEventRepository';
import IEventDocument from '../../../models/events/interfaces/IEvent';
import { Types } from 'mongoose';

export default class EventRepository implements IEventRepository {
    private baseRepo: IBaseRepository<IEventDocument> = new BaseRepository<IEventDocument>(EventModel);

    async createEvent(eventData: IEventDocument): Promise<IEventDocument> {
        try {
            const result = await this.baseRepo.create(eventData);
            return result;
        } catch (error) {
            throw new Error(`Failed to create event: ${(error as Error).message}`);
        }
    }

    async getAllEvents(): Promise<IEventDocument[]> {
        try {
            const result = await this.baseRepo.findAll();

            return result;
        } catch (error) {
            throw new Error(`Failed to get events: ${(error as Error).message}`);
        }
    }

    async getEvent(event_id: string): Promise<IEventDocument | null> {
        try {
            const eventId = new Types.ObjectId(event_id);

            const result = await this.baseRepo.findOne(eventId);

            return result;
        } catch (error) {
            throw new Error(`Failed to get events: ${(error as Error).message}`);
        }
    }

    async reduceTicketCount(event_id: string): Promise<IEventDocument | null> {
        try {
            const eventId = new Types.ObjectId(event_id);

            const updatedEvent = await EventModel.findOneAndUpdate(
                { _id: eventId, total_tickets: { $gt: 0 } }, 
                { $inc: { total_tickets: -1 } },
                { new: true }
            );

            if (!updatedEvent) {
                throw new Error("Event not found or no tickets left");
            }

            return updatedEvent;
        } catch (error) {
            throw new Error(`Failed to reduce ticket count: ${(error as Error).message}`);
        }
    }
}
