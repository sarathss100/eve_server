import { wrapServiceError } from '../../../error/AppError'; 
import IEventDTO from '../../../dtos/event/IEventDTO';
import EventMapper from '../../../mappers/event/EventMapper';
import IEventService from '../interface/IEventService';
import IEventRepository from '../../../repositories/events/interface/IEventRepository';

export default class EventService implements IEventService {
    private _eventRepository: IEventRepository;
    constructor(eventRepository: IEventRepository) {
        this._eventRepository = eventRepository;
    }

    async getAllEvents(): Promise<IEventDTO[]> {
        try {
            const results = await this._eventRepository.getAllEvents();

            const events = EventMapper.toDTOs(results);

            return events;
        } catch (error) {
            throw wrapServiceError(error);
        }
    }
}