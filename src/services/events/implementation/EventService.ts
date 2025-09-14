import { NotFoundError, wrapServiceError } from '../../../error/AppError'; 
import IEventDTO from '../../../dtos/event/IEventDTO';
import EventMapper from '../../../mappers/event/EventMapper';
import IEventService from '../interface/IEventService';
import IEventRepository from '../../../repositories/events/interface/IEventRepository';
import { ErrorMessages } from '../../../constants/errorMessages';
import { StatusCodes } from '../../../constants/statusCodes';

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

    async getEvent(event_id: string): Promise<IEventDTO> {
        try {
            const result = await this._eventRepository.getEvent(event_id);

            if (!result) {
                throw new NotFoundError(ErrorMessages.EVENT_NOT_FOUND, StatusCodes.NOT_FOUND);
            }

            const event = EventMapper.toIEventDTO(result);

            return event;
        } catch (error) {
            throw wrapServiceError(error);
        }
    }
}