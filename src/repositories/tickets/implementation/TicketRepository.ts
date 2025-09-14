import BaseRepository from '../../base/implementation/BaseRepository';
import IBaseRepository from '../../base/interface/IBaseRepository';
import ITicketDocument from '../../../models/tickets/interfaces/ITicket';
import { TicketModel } from '../../../models/tickets/model/ticket.model';
import ITicketRepository from '../interface/ITicketRepository';
import { Types } from 'mongoose';

export default class TicketRepository implements ITicketRepository {
    private ticketBaseRepo: IBaseRepository<ITicketDocument> = new BaseRepository<ITicketDocument>(TicketModel);

    async generateTicket(ticketData: Partial<ITicketDocument>): Promise<ITicketDocument> {
        try {
            const result = await this.ticketBaseRepo.create(ticketData);
            return result;
        } catch (error) {
            throw new Error(`Failed to create an payment history: ${(error as Error).message}`);
        }
    }

    async getTickets(user_id: string): Promise<ITicketDocument[]> {
        try {
            const userId = new Types.ObjectId(user_id);

            const result = await this.ticketBaseRepo.find({ user_id: userId });
            
            return result;
        } catch (error) {
            throw new Error(`Failed to create an payment history: ${(error as Error).message}`);
        }
    }
}