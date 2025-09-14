import { Request, Response } from 'express';
import { StatusCodes } from "../../../constants/statusCodes";
import { SuccessMessages } from "../../../constants/successMessages";
import { AuthenticationError, handleControllerError } from "../../../error/AppError";
import IOrganizerService from "../../../services/organizer/interface/IOrganizerService";
import { sendSuccessResponse } from "../../../utils/responseHandler";
import IOrganizerController from "../interface/IOrganizerController";
import { ErrorMessages } from '../../../constants/errorMessages';

export default class OrganizerController implements IOrganizerController {
    private readonly _organizerService: IOrganizerService;

    constructor(organizerService: IOrganizerService) {
        this._organizerService = organizerService;
    }

    async toggleUserRole(request: Request, response: Response): Promise<void> {
        try {
            const { new_role } = request.body;
            const { id } = request.params;
            
            const userDetails = await this._organizerService.toggleUserRole(id, new_role);

            const { user_id, name, role, email } = userDetails;
    
            sendSuccessResponse(response, StatusCodes.OK, SuccessMessages.OPERATION_SUCCESS, { user_id, name, role, email });
        } catch (error) {
            handleControllerError(response, error);
        }
    }

    async createEvent(request: Request, response: Response): Promise<void> {
        try {
            const eventData = request.body;
            
            const { accessToken } = request.cookies;
            if (!accessToken) {
                throw new AuthenticationError(ErrorMessages.ACCESS_TOKEN_NOT_FOUND, StatusCodes.UNAUTHORIZED);
            }
            
            const eventDetails = await this._organizerService.createEvent(accessToken, eventData);
    
            sendSuccessResponse(response, StatusCodes.OK, SuccessMessages.OPERATION_SUCCESS, { eventDetails });
        } catch (error) {
            handleControllerError(response, error);
        }
    }

    async updateEvent(request: Request, response: Response): Promise<void> {
        try {
            const eventData = request.body;
            
            const { accessToken } = request.cookies;
            if (!accessToken) {
                throw new AuthenticationError(ErrorMessages.ACCESS_TOKEN_NOT_FOUND, StatusCodes.UNAUTHORIZED);
            }
            
            const eventDetails = await this._organizerService.updateEvent(accessToken, eventData);
    
            sendSuccessResponse(response, StatusCodes.OK, SuccessMessages.OPERATION_SUCCESS, { eventDetails });
        } catch (error) {
            handleControllerError(response, error);
        }
    }

    async deleteEvent(request: Request, response: Response): Promise<void> {
        try {
            const { id } = request.params;
            
            if (!id) {
                throw new AuthenticationError(ErrorMessages.EVENT_ID_MISSING, StatusCodes.UNAUTHORIZED);
            }
            
            const isDeleted = await this._organizerService.deleteEvent(id);
    
            sendSuccessResponse(response, StatusCodes.OK, SuccessMessages.OPERATION_SUCCESS, { isDeleted });
        } catch (error) {
            handleControllerError(response, error);
        }
    }

    async getAllEvents(request: Request, response: Response): Promise<void> {
        try {
            const events = await this._organizerService.getAllEvents();
    
            sendSuccessResponse(response, StatusCodes.OK, SuccessMessages.OPERATION_SUCCESS, { events });
        } catch (error) {
            handleControllerError(response, error);
        }
    }

    async getAllUsers(request: Request, response: Response): Promise<void> {
        try {
            const users = await this._organizerService.getAllUsers();
    
            sendSuccessResponse(response, StatusCodes.OK, SuccessMessages.OPERATION_SUCCESS, { users });
        } catch (error) {
            handleControllerError(response, error);
        }
    }

    async getAllTickets(request: Request, response: Response): Promise<void> {
        try {
            const tickets = await this._organizerService.getAllTickets();
    
            sendSuccessResponse(response, StatusCodes.OK, SuccessMessages.OPERATION_SUCCESS, { tickets });
        } catch (error) {
            handleControllerError(response, error);
        }
    }
}