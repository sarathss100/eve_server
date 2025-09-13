import { Request, Response } from 'express';
import { StatusCodes } from "../../../constants/statusCodes";
import { SuccessMessages } from "../../../constants/successMessages";
import { handleControllerError } from "../../../error/AppError";
import { sendSuccessResponse } from "../../../utils/responseHandler";
import IEventController from '../interface/IEventController';
import IEventService from '../../../services/events/interface/IEventService';

export default class EventController implements IEventController {
    private readonly _eventService: IEventService;

    constructor(eventService: IEventService) {
        this._eventService = eventService;
    }

    async getAllEvents(request: Request, response: Response): Promise<void> {
        try {
            const events = await this._eventService.getAllEvents();
    
            sendSuccessResponse(response, StatusCodes.OK, SuccessMessages.OPERATION_SUCCESS, { events });
        } catch (error) {
            handleControllerError(response, error);
        }
    }
}