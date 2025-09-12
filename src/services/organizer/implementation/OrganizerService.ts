import { NotFoundError, ServerError, ValidationError } from '../../../error/AppError';
import { ErrorMessages } from '../../../constants/errorMessages'; 
import { StatusCodes } from '../../../constants/statusCodes';
import { wrapServiceError } from '../../../error/AppError'; 
import IOrganizerService from '../interface/IOrganizerService';
import IOrganizerRepository from '../../../repositories/organizer/interface/IOrganizerRepository';
import IEventDTO from '../../../dtos/event/IEventDTO';
import { EventSchema } from '../../../validations/event/event.validation';
import { extractUserIdFromToken } from '../../../utils/tokenUtils';
import EventMapper from '../../../mappers/event/EventMapper';

export default class OrganizerService implements IOrganizerService {
    private _organizerRepository: IOrganizerRepository;
    constructor(organizerRepository: IOrganizerRepository) {
        this._organizerRepository = organizerRepository;
    }

    async toggleUserRole(user_id: string, new_role: string): Promise<boolean> {
        try {
            if (!user_id || !new_role) {
                throw new ValidationError(ErrorMessages.MISSING_DETAILS, StatusCodes.INVALID_INPUT);
            }

            const isToggled = await this._organizerRepository.toggleUserRole(user_id, new_role);

            if (!isToggled) {
                throw new ServerError(ErrorMessages.ROLE_CHANGE_FAILED, StatusCodes.BAD_REQUEST);
            }

            return !!isToggled;
        } catch (error) {
            throw wrapServiceError(error);
        }
    }

    async createEvent(accessToken: string, eventData: IEventDTO): Promise<IEventDTO> {
        try {
            const validatedData = EventSchema.parse(eventData);

            const user_id = extractUserIdFromToken(accessToken);
            if (!user_id) {
                throw new NotFoundError(ErrorMessages.USER_ID_MISSING_IN_TOKEN, StatusCodes.NOT_FOUND);
            }

            validatedData.organizer_id = user_id;

            const mappedModel = EventMapper.toModel(validatedData);

            const createdEvent = await this._organizerRepository.createEvent(mappedModel);

            const eventDetails = EventMapper.toIEventDTO(createdEvent);

            return eventDetails;
        } catch (error) {
            throw wrapServiceError(error);
        }
    }

    async updateEvent(accessToken: string, eventData: Partial<IEventDTO>): Promise<IEventDTO> {
        try {
            const validatedData = EventSchema.parse(eventData);

            const user_id = extractUserIdFromToken(accessToken);
            if (!user_id) {
                throw new NotFoundError(ErrorMessages.USER_ID_MISSING_IN_TOKEN, StatusCodes.NOT_FOUND);
            }

            validatedData.organizer_id = user_id;

            const mappedModel = EventMapper.toModel(validatedData);

            const updatedEvent = await this._organizerRepository.updateEvent(mappedModel);

            if (!updatedEvent) {
                throw new ServerError(ErrorMessages.OPERATION_FAILED, StatusCodes.INTERNAL_SERVER_ERROR);
            }

            const eventDetails = EventMapper.toIEventDTO(updatedEvent);

            return eventDetails;
        } catch (error) {
            throw wrapServiceError(error);
        }
    }

    async deleteEvent(event_id: string): Promise<boolean> {
        try {
            const isDeleted = await this._organizerRepository.deleteEvent(event_id);

            if (!isDeleted) {
                throw new ServerError(ErrorMessages.OPERATION_FAILED, StatusCodes.INTERNAL_SERVER_ERROR);
            }

            return !!isDeleted;
        } catch (error) {
            throw wrapServiceError(error);
        }
    }

    async getAllEvents(): Promise<IEventDTO[]> {
        try {
            const results = await this._organizerRepository.getAllEvents();

            const events = EventMapper.toDTOs(results);

            return events;
        } catch (error) {
            throw wrapServiceError(error);
        }
    }
}