import { EventModel } from '../../../models/events/model/event.model';  
import BaseRepository from '../../base/implementation/BaseRepository';
import IBaseRepository from '../../base/interface/IBaseRepository';
import IEventRepository from '../interface/IEventRepository';
import IEventDocument from '../../../models/events/interfaces/IEvent';

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
}
