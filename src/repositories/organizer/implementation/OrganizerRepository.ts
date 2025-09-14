import { UserModel } from '../../../models/user/model/user.model'; 
import IUserDocument from '../../../models/user/interfaces/IUser';
import BaseRepository from '../../base/implementation/BaseRepository';
import IBaseRepository from '../../base/interface/IBaseRepository';
import IOrganizerRepository from '../interface/IOrganizerRepository';
import IEventDocument from '../../../models/events/interfaces/IEvent';
import { EventModel } from '../../../models/events/model/event.model';
import ITicketDocument from '../../../models/tickets/interfaces/ITicket';
import { TicketModel } from '../../../models/tickets/model/ticket.model';
import { Types } from 'mongoose';

export default class OrganizerRepository implements IOrganizerRepository {
    private userBaseRepo: IBaseRepository<IUserDocument> = new BaseRepository<IUserDocument>(UserModel);
    private eventBaseRepo: IBaseRepository<IEventDocument> = new BaseRepository<IEventDocument>(EventModel);
    private ticketBaseRepo: IBaseRepository<ITicketDocument> = new BaseRepository<ITicketDocument>(TicketModel);

    async toggleUserRole(_id: string, new_role: string): Promise<IUserDocument | null> {
        try {
            const result = await this.userBaseRepo.updateOne({ _id }, { $set: { role: new_role } });
            return result;
        } catch (error) {
            throw new Error(`Failed to toggle user role: ${(error as Error).message}`);
        }
    }

    async createEvent(eventData: Partial<IEventDocument>): Promise<IEventDocument> {
        try {
            const result = await this.eventBaseRepo.create(eventData);
            return result;
        } catch (error) {
            throw new Error(`Failed to create an event: ${(error as Error).message}`);
        }
    }

    async updateEvent(eventData: Partial<IEventDocument>): Promise<IEventDocument | null> {
        try {
            const result = await this.eventBaseRepo.updateOne({ _id: eventData._id }, { $set: eventData });
            return result;
        } catch (error) {
            throw new Error(`Failed to create an event: ${(error as Error).message}`);
        }
    }

    async deleteEvent(event_id: string): Promise<IEventDocument | null> {
        try {
            const result = await this.eventBaseRepo.deleteOne({ _id: event_id });

            return result;
        } catch (error) {
            throw new Error(`Failed to delete an event: ${(error as Error).message}`);
        }
    }

    async deleteTickets(event_id: string): Promise<{ acknowledged: boolean; deletedCount: number }> {
        try {
            const eventId = new Types.ObjectId(event_id);

            const result = await this.ticketBaseRepo.deleteMany({ event_id: eventId });

            return result;
        } catch (error) {
            throw new Error(`Failed to delete an event: ${(error as Error).message}`);
        }
    }

    async getAllEvents(): Promise<IEventDocument[]> {
        try {
            const result = await this.eventBaseRepo.findAll();

            return result;
        } catch (error) {
            throw new Error(`Failed to get events: ${(error as Error).message}`);
        }
    }

    async getAllUsers(): Promise<IUserDocument[]> {
        try {
            const result = await this.userBaseRepo.findAll();

            return result;
        } catch (error) {
            throw new Error(`Failed to get attendees: ${(error as Error).message}`);
        }
    }

    async getAllTickets(): Promise<ITicketDocument[]> {
        try {
            const result = await this.ticketBaseRepo.findAll();

            return result;
        } catch (error) {
            throw new Error(`Failed to get attendees: ${(error as Error).message}`);
        }
    }

    async updateTickets(event_id: string): Promise<{ acknowledged: boolean; modifiedCount: number }> {
        try {
            const eventId = new Types.ObjectId(event_id);

            const result = await this.ticketBaseRepo.updateMany({ event_id: eventId }, { $set: { ticket_status: 'cancelled' }});

            return result;
        } catch (error) {
            throw new Error(`Failed to get attendees: ${(error as Error).message}`);
        }
    }
}
